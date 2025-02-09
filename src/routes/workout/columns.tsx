import {ColumnsType} from "antd/es/table";
import {TableActions} from "../../components/table-actions";
import {ID} from "../../services/api/types/common.ts";
import {IExercise} from "../../services/api/types/exercise.ts";
import {Typography} from "antd";

const {Text} = Typography

export const getColumns = (exercises: IExercise[], handleEdit: (data: IExercise) => void, handleDelete: (id: ID) => void): ColumnsType<IExercise> => [
    {
        title: 'Группа',
        dataIndex: 'group',
        key: 'group',
        width: 150,
        render: (data, record, index) => {
            const categoryCount = exercises.filter(
                (exercise) => exercise.group?.id === data?.id
            ).length;

            const rowspan = categoryCount > 1 ? categoryCount : 1;

            if (
                index === 0 ||
                record.group?.id !== exercises[index - 1].group?.id
            ) {
                return {
                    children: (
                        <Text>
                            {data ? data.name : 'Без группы'}
                        </Text>
                    ),
                    props: {
                        rowSpan: rowspan,
                    },
                };
            }

            return {
                children: '',
                props: {
                    rowSpan: 0,
                },
            };
        },
    },
    {
        title: 'Название',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Действие',
        key: 'actions',
        width: '10%',
        render: (data: IExercise) => <TableActions data={data} onEdit={handleEdit} onDelete={handleDelete}/>
    },
]