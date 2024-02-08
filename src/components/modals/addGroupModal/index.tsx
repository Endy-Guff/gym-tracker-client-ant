import {FC, useEffect, useState} from 'react';

import {Form, Input, Modal,} from 'antd';
import {IGroup} from "../../../services/api/types/group.ts";
import {ID} from "../../../services/api/types/common.ts";

type Values = Omit<IGroup, 'id'>

interface IAddGroupModalProps {
    open: boolean;
    initialValue: IGroup | null;
    onSubmit: (values: Values, id?: ID) => void;
    onCancel: () => void;
}

export const AddGroupModal: FC<IAddGroupModalProps> = ({
                                                           open,
                                                           initialValue,
                                                           onSubmit,
                                                           onCancel,
                                                       }) => {
    const [submittable, setSubmittable] = useState(false);

    const [form] = Form.useForm();
    const values = Form.useWatch([], form);

    const handleClose = () => {
        form.resetFields();
        setSubmittable(false);

        onCancel();
    };

    useEffect(() => {
        form
            .validateFields({validateOnly: true})
            .then(
                () => {
                    setSubmittable(true);
                },
                () => {
                    setSubmittable(false);
                }
            )
            .catch((err) => {
                console.log(err);
            });
    }, [form, values]);

    useEffect(() => {
        form.setFieldsValue(initialValue || {});
    }, [form, initialValue]);

    return (
        <Modal
            open={open}
            centered
            title={
                initialValue
                    ? 'Редактирование группы'
                    : 'Создание новой группы'
            }
            okText={initialValue ? 'Сохранить' : 'Создать'}
            cancelText="Отменить"
            okButtonProps={{
                disabled: !submittable,
            }}
            onCancel={handleClose}
            onOk={() => {
                form
                    .validateFields()
                    .then((values: Values) => {
                        onSubmit(
                            values,
                            initialValue?.id
                        );
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    }).finally(() =>
                    form.resetFields()
                );
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
            >
                <Form.Item
                    name="name"
                    label="Название"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, укажите название группы',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
            </Form>
        </Modal>
    );
};
