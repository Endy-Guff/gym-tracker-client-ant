import {PageLayout} from "../../layouts/page";
import {Button, Table,} from "antd";
import {IGroup} from "../../services/api/types/group.ts";
import {
    useCreateGroupMutation,
    useDeleteGroupMutation,
    useGetGroupsQuery,
    useUpdateGroupMutation
} from "../../services/api/group";
import {getColumns} from "./columns.tsx";
import {useState} from "react";
import {AddGroupModal} from "../../components/modals/addGroupModal";
import {ID} from "../../services/api/types/common.ts";
import {PlusOutlined} from "@ant-design/icons";

export const GroupsPage = () => {
    const [createGroupModalIsOpen, setCreateGroupModalIsOpen] = useState(false)
    const [groupInitialValues, setGroupInitialValues] = useState<IGroup | null>(null)
    const {data, isLoading} = useGetGroupsQuery()
    const [createGroup] = useCreateGroupMutation()
    const [updateGroup] = useUpdateGroupMutation()
    const [deleteGroup] = useDeleteGroupMutation()

    const handleEdit = (data: IGroup) => {
        setCreateGroupModalIsOpen(true)
        setGroupInitialValues(data)
    }

    const handleDelete = (id: ID) => deleteGroup({id})

    const handleCancel = () => {
        setCreateGroupModalIsOpen(false)
        setGroupInitialValues(null)
    }

    const handleSubmit = (data: Omit<IGroup, 'id'>, id?: ID) => {
        if (id) {
            updateGroup({...data, id})
        } else {
            createGroup(data)
        }
        handleCancel()
    }


    const columns = getColumns(handleEdit, handleDelete)

    return <>
        <PageLayout
            title="Конфигурация групп"
            actions={[
                <Button
                    onClick={() => setCreateGroupModalIsOpen(true)}
                    icon={<PlusOutlined/>}
                    type="primary"
                >
                    Новая группа
                </Button>,
            ]}
        >
            <Table
                rowKey="id"
                bordered
                loading={isLoading}
                pagination={false}
                columns={columns}
                dataSource={data}
            />
        </PageLayout>
        <AddGroupModal
            initialValue={groupInitialValues}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            open={createGroupModalIsOpen}/>
    </>
}
