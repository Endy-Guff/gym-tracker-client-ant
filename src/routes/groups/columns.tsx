import {ColumnsType} from "antd/es/table";
import {IGroup} from "../../services/api/types/group.ts";
import {TableActions} from "../../components/table-actions";
import {ID} from "../../services/api/types/common.ts";


export const getColumns = (handleEdit: (data: IGroup) => void, handleDelete: (id: ID) => void): ColumnsType<IGroup> => [
    {
        title: 'Название',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Действие',
        key: 'actions',
        width: '10%',
        render: (data: IGroup) => <TableActions data={data} onEdit={handleEdit} onDelete={handleDelete}/>
    },
]