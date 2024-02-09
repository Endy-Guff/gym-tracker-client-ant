import {FC, useEffect, useState} from 'react';

import {Form, Input, Modal,} from 'antd';
import {IGroup} from "../../../services/api/types/group.ts";
import {ID} from "../../../services/api/types/common.ts";
import {ICreateExerciseArgs, IExercise} from "../../../services/api/types/exercise.ts";
import {SearchSelect} from "../../search-select";

type Values = ICreateExerciseArgs

interface IAddExerciseModalProps {
    open: boolean;
    groups?: IGroup[];
    initialValue: IExercise | null;
    onSubmit: (values: Values, id?: ID) => void;
    onCancel: () => void;
}

export const AddExerciseModal: FC<IAddExerciseModalProps> = ({
                                                                 open,
                                                                 groups,
                                                                 initialValue,
                                                                 onSubmit,
                                                                 onCancel,
                                                             }) => {
    const [submittable, setSubmittable] = useState(false);

    const [form] = Form.useForm();
    const values = Form.useWatch([], form);

    const groupOptions = groups?.map(({id, name}) => ({
        value: id.toString(),
        label: name,
    }))


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
        form.setFieldsValue({name: initialValue?.name, groupId: initialValue?.group.id} || {});
    }, [form, initialValue]);

    return (
        <Modal
            open={open}
            centered
            title={
                initialValue
                    ? 'Редактирование упражнения'
                    : 'Создание нового упражнения'
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
                <Form.Item
                    name="groupId"
                    label="Группа"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, укажите группу',
                        },
                    ]}
                >
                    <SearchSelect options={groupOptions ?? []}/>
                </Form.Item>

            </Form>
        </Modal>
    );
};
