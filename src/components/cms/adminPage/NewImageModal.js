import {Button, Modal, Form, Input, Radio, Icon} from 'antd';
import React from "react";

const CollectionCreateForm = Form.create({name: 'form_in_modal'})(
    // eslint-disable-next-line
    class extends React.Component {
        render() {
            const {visible, onCancel, onCreate, form} = this.props;
            const {getFieldDecorator} = form;
            return (
                <Modal
                    visible={visible}
                    title="Add Image"
                    okText="Create"
                    onCancel={onCancel}
                    onOk={onCreate}
                    // confirmLoading={AddImageModalConfirmLoading}
                >
                    <Form layout="vertical">
                        <Form.Item label="Title">
                            {getFieldDecorator('title', {
                                rules: [{required: true, message: 'Please input the title of collection!'}],
                            })(<Input/>)}
                        </Form.Item>
                        <Form.Item label="Description">
                            {getFieldDecorator('description')(<Input type="textarea"/>)}
                        </Form.Item>
                        <Form.Item className="collection-create-form_last-form-item">
                            {getFieldDecorator('modifier', {
                                initialValue: 'public',
                            })(
                                <Radio.Group>
                                    <Radio value="public">Public</Radio>
                                    <Radio value="private">Private</Radio>
                                </Radio.Group>,
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    },
);

class NewImageModal extends React.Component {
    state = {
        visible: false,
    };

    showModal = () => {
        this.setState({visible: true});
    };

    handleCancel = () => {
        this.setState({visible: false});
    };

    handleCreate = () => {
        const {form} = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({visible: false});
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    render() {
        return (
            <div className={'add-new-project-or-image-container'}>

                <div onClick={this.showModal}>
                    <Icon type="plus" className={'add-new-image-icon'}/>
                    <p className={'add-new-image-text'}>Add new image</p>
                </div>

                {/*<Button*/}
                {/*    type="primary"*/}
                {/*    onClick={this.showModal}*/}
                {/*    className={'add-new-image-or-image-container'}>*/}
                {/*    New Collection*/}
                {/*</Button>*/}
                {/*<div*/}
                {/*    // className={'add-new-project-or-image-container'}*/}
                {/*    onClick={this.showModal}>*/}
                {/*    <Icon type="plus" className={'add-new-image-icon'}/>*/}
                {/*    <p className={'add-new-image-text'}>Add new image</p>*/}
                {/*</div>*/}
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
            </div>
        );
    }
}

export default NewImageModal;