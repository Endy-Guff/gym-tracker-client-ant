import {PageLayout} from "../../layouts/page";
import {Button, Table,} from "antd";
import {
    useGetGroupsQuery,
} from "../../services/api/group";
import {getColumns} from "./columns.tsx";
import {useMemo, useState} from "react";
import {ID} from "../../services/api/types/common.ts";
import {PlusOutlined} from "@ant-design/icons";
import {
    useCreateExercisesMutation, useDeleteExercisesMutation,
    useGetExercisesQuery,
    useUpdateExercisesMutation
} from "../../services/api/exercise/api.ts";
import {AddExerciseModal} from "../../components/modals/addExerciseModal";
import {ICreateExerciseArgs, IExercise} from "../../services/api/types/exercise.ts";

export const ExercisesPage = () => {
    const [createExerciseModalIsOpen, setCreateExerciseModalIsOpen] = useState(false)
    const [exerciseInitialValues, setExerciseInitialValues] = useState<IExercise | null>(null)
    const {data: groups} = useGetGroupsQuery()
    const {data: exercises, isLoading} = useGetExercisesQuery()
    const [createExercise] = useCreateExercisesMutation()
    const [updateExercise] = useUpdateExercisesMutation()
    const [deleteExercise] = useDeleteExercisesMutation()

    const sortedExercises = useMemo(
        () => {
            if (exercises) {
                return [...exercises].sort((a, b) => {
                    if (!a.group) return 1;

                    if (!b.group) return -1;

                    return a.group.name.localeCompare(b.group.name);
                })
            }
        },
        [exercises]
    );


    const handleEdit = (data: IExercise) => {
        setCreateExerciseModalIsOpen(true)
        setExerciseInitialValues(data)
    }

    const handleDelete = (id: ID) => deleteExercise({id})

    const handleCancel = () => {
        setCreateExerciseModalIsOpen(false)
        setExerciseInitialValues(null)
    }

    const handleSubmit = (data: ICreateExerciseArgs, id?: ID) => {
        if (id) {
            updateExercise({...data, id})
        } else {
            createExercise(data)
        }
        handleCancel()
    }


    const columns = exercises ? getColumns(exercises, handleEdit, handleDelete) : []

    return <>
        <PageLayout
            title="Конфигурация упражнений"
            actions={[
                <Button
                    onClick={() => setCreateExerciseModalIsOpen(true)}
                    icon={<PlusOutlined/>}
                    type="primary"
                >
                    Новое упражнение
                </Button>,
            ]}
        >
            <Table
                rowKey="id"
                bordered
                loading={isLoading}
                pagination={false}
                columns={columns}
                dataSource={sortedExercises}
            />
        </PageLayout>
        <AddExerciseModal
            groups={groups}
            initialValue={exerciseInitialValues}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            open={createExerciseModalIsOpen}/>
    </>
}
