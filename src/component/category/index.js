import { Button, Divider, Form, Input, Modal, Select, Table, Tag, message, Descriptions, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useAddCategoryMutation, useDeleteCategoryByIdMutation, useGetCategoriesQuery, useUpdateCategoryByIdMutation } from '@/redux/slices/Category';
import { validateMessages } from '@/ultils/requireMessage';
import { ParseDate } from '@/ultils/dataParser'

const ModalEdit = ({ isModalOpen, setIsModalOpen, dataView, setDataView, categories }) => {
    const [updateCategoryById, { isLoading }] = useUpdateCategoryByIdMutation()
    const [form] = Form.useForm()
    const handleSubmit = (values) => {
        if (categories?.map(i => i.name).includes(values.name)) {
            return message.error("Category Existed")
        }
        updateCategoryById({ ...values, id: dataView.id }).unwrap().then(res => {
            form.resetFields()
            setIsModalOpen(false)
            setDataView(null)
            message.success("Category Updated")
        }).catch(res => {
            console.log(res.data)
            message.error(res.data.message)
        })
    }
    useEffect(() => {
        form.setFieldsValue({
            ...dataView,
        })
    }, [dataView])

    return <Modal title="EDIT CATEGORY" open={isModalOpen} onCancel={() => setIsModalOpen(false)} width={600}
        footer={[
            <Button key="Close" onClick={() => setIsModalOpen(false)}>Close</Button>,
            <Button key="Save" type='primary' onClick={() => form.submit()} loading={isLoading}>Save Changes</Button>,
        ]}
    >
        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} form={form} onFinish={handleSubmit} validateMessages={validateMessages}>
            <Form.Item label="Name" name="name" colon={false} rules={[{ required: true }]}>
                <Input type="text" />
            </Form.Item>
        </Form>
    </Modal >
}

const AddModal = ({ categories }) => {
    const [addCategory, { isLoading }] = useAddCategoryMutation()
    const [form] = Form.useForm()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleSubmit = (values) => {
        if (categories?.map(i => i.name).includes(values.name)) {
            return message.error("Category Existed")
        }
        addCategory(values).unwrap().then(res => {
            console.log(res)
            form.resetFields()
            setIsModalOpen(false)
            message.success("Category Added")
        }).catch(res => {
            console.log(res.data)
            message.error(res.data.message)
        })
    }
    return <div style={{ textAlign: "right", margin: "20px 0 10px 0" }}>
        <Button type='primary' size='large' onClick={() => setIsModalOpen(true)}>ADD NEW</Button>
        <Modal title="ADD CATEGORY" open={isModalOpen} onCancel={() => { form.resetFields(); setIsModalOpen(false) }} width={600}
            footer={[
                <Button key="Close" onClick={() => { form.resetFields(); setIsModalOpen(false) }}>Close</Button>,
                <Button key="Save" type='primary' onClick={() => form.submit()} loading={isLoading}>Add New</Button>,
            ]}
        >
            <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} form={form} validateMessages={validateMessages} onFinish={handleSubmit}>
                <Form.Item label="Name" name="name" colon={false} rules={[{ required: true }]}>
                    <Input type="text" onChange={(e) => form.setFieldValue("name", e.target.value.toUpperCase())} />
                </Form.Item>
            </Form>
        </Modal >
    </div >
}
const ConfirmDelete = ({ id, name }, deleteCategoryById) => {
    console.log(id)
    Modal.confirm({
        title: 'Do you Want to delete this item ?',
        icon: <ExclamationCircleFilled />,
        content: <>
            <Descriptions column={1}>
                <Descriptions.Item label="name">{name}</Descriptions.Item>
            </Descriptions>
        </>,
        onOk() {
            deleteCategoryById(id).unwrap().then(res => message.success("Category Deleted")).catch(err => {
                console.log(err)
                message.error("Failed To Delete This!")
            })
        },
        onCancel() {
            console.log('Cancel');
        },
    });
}


export const Categories = () => {
    const { data, isloading } = useGetCategoriesQuery()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteCategoryById, { isLoading: loadingDelete }] = useDeleteCategoryByIdMutation()
    const [dataView, setDataView] = useState(null)
    const Columns = (setDataView, setIsModalOpen) => {
        return [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                width: "40%",
            },
            {
                title: 'Created At',
                dataIndex: 'createdAt',
                key: 'createdAt',
                width: "20%",
                render: (value) => {
                    return <>{ParseDate(value)}</>
                }
            },
            {
                title: 'Updated At',
                dataIndex: 'updatedAt',
                key: 'updatedAt',
                width: "20%",
                render: (value) => {
                    return <>{ParseDate(value)}</>
                }
            },
            {
                title: "Action",
                dataIndex: "action",
                key: "action",
                width: "10%",
                render: (value, record) => {
                    return <div style={{ textAlign: "center" }}>
                        <Tag color="cyan" style={{ cursor: "pointer", padding: "5px 10px" }} onClick={() => {
                            setDataView(record)
                            setIsModalOpen(true)
                        }}>EDIT</Tag>
                        <Tag color="red" style={{ cursor: "pointer", padding: "5px 10px" }} onClick={() => ConfirmDelete(record, deleteCategoryById)}>Delete</Tag>
                    </div>
                }
            }
        ];
    }

    return (
        <div>
            <AddModal categories={data} />
            <Spin spinning={loadingDelete}>
                <Table loading={isloading} dataSource={data || []} columns={Columns(setDataView, setIsModalOpen)} bordered
                    pagination={{ pageSize: 5 }}
                    title={() => <Divider><h2 style={{ textAlign: "center" }}>TABLE OF CATEGORIES</h2></Divider>} />
            </Spin>

            <ModalEdit isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} dataView={dataView} setDataView={setDataView} categories={data?.filter(i => i.id !== dataView?.id)} />
        </div>
    )
}