import {Button, Popconfirm, Space, Tooltip} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {ID} from "../../services/api/types/common.ts";

interface IDataWithId {
    id: ID
}

interface ITableActionsProps<T extends IDataWithId> {
    data?: T
    onEdit?: (data: T) => void,
    onDelete?: (id: ID) => void
}

export const TableActions = <T extends IDataWithId>({onDelete, onEdit, data}: ITableActionsProps<T>) => <Space
    size="middle">
    {onEdit && data && <Tooltip title="Редактирование">
      <Button
        onClick={() => onEdit(data)}
      >
        <EditOutlined/>
      </Button>
    </Tooltip>}
    {onDelete && data?.id && <Tooltip title="Удаление">
      <Popconfirm
        title="Вы уверены?"
        cancelText="Отменить"
        onConfirm={() => onDelete(data?.id)}
      >
        <Button>
          <DeleteOutlined/>
        </Button>
      </Popconfirm>
    </Tooltip>}
</Space>