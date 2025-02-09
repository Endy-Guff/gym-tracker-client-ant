import {useParams} from "react-router-dom";
import {Button, Table} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {PageLayout} from "../../layouts/page";
import {useGetWorkoutQuery} from "../../services/api/workout/api.ts";
import {skipToken} from "@reduxjs/toolkit/query";


export const WorkoutPage = () => {
    const {id} = useParams<{ id: string }>()
    const {data} = useGetWorkoutQuery(id ? { id } : skipToken)
    console.log(data)
    return (
        <PageLayout
            title={`Тренировка ${data?.date}`}
            actions={[
                <Button
                    onClick={() => {
                    }}
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
                loading={false}
                pagination={false}
                columns={[]}
                dataSource={[]}
            />
        </PageLayout>
    )
}