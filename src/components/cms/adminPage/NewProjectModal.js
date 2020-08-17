import {Modal, Form, Input, Icon, Upload, message} from 'antd';
import React from "react";

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}



const ProjectsCreateForm = Form.create({name: 'form_in_modal'})(
    // eslint-disable-next-line
    class extends React.Component {

        state = {
            loading: false,
            uploadedImage: null
        };

        handleChange = info => {
            if (info.file.status === 'uploading') {
                this.setState({ loading: true });
            }else  {
                // Get this url from response in real world.
                getBase64(info.file.originFileObj, imageUrl =>
                    this.setState({
                        imageUrl,
                    }),
                );
                this.setState({
                    uploadedImage: info.file.originFileObj,
                    loading: false,
                });
                this.props.imageFetcher(this.state.uploadedImage);
            }
        };

        render() {
            const uploadButton = (
                <div>
                    <Icon type={this.state.loading ? 'loading' : 'plus'} />
                    <div className="ant-upload-text">Upload</div>
                </div>
            );
            const { imageUrl } = this.state;

            const {visible, onCancel, onCreate, form} = this.props;
            const {getFieldDecorator} = form;
            return (
                <Modal
                    visible={visible}
                    title="Add Project"
                    okText="Create"
                    onCancel={onCancel}
                    onOk={onCreate}
                    // confirmLoading={AddProjectModalConfirmLoading}
                >
                    <Form layout="vertical">
                        <Form.Item label="Project name">
                            {getFieldDecorator('title', {
                                rules: [{required: true, message: 'Please input the name of project!'}],
                            })(<Input/>)}
                        </Form.Item>
                        <Form.Item label="Project name en">
                            {getFieldDecorator('titleEn', {
                                rules: [{required: true, message: 'Please input the name of project in english!'}],
                            })(<Input/>)}
                        </Form.Item>
                        <Form.Item label="Description">
                            {getFieldDecorator('description')(<Input type="textarea"/>)}
                        </Form.Item>
                        <Form.Item label="Description en">
                            {getFieldDecorator('descriptionEn')(<Input type="textarea"/>)}
                        </Form.Item>
                        <Form.Item  label="Upload the main photo of project">
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                beforeUpload={beforeUpload}
                                onChange={this.handleChange}
                            >
                                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    },
);

class NewProjectModal extends React.Component {
    state = {
        visible: false,
        fetchedImage: null
    };

    showModal = () => {
        this.setState({visible: true});
    };

    handleCancel = () => {
        this.setState({visible: false});
    };

    imageFetcher = (fetchedImage) => {
        this.setState({
            fetchedImage: fetchedImage
        })
    };

    handleCreate = () => {
        const {form} = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            form.resetFields();
            this.setState({visible: false});

            let name = values.title;
            let description = values.description;
            let nameEn = values.titleEn;
            let descriptionEn = values.descriptionEn;
            let url = 'https://loftic.ge/images/callNati.jpeg';
            let projectId = '0';

            this.props.valuesFetcher(name, description, url, projectId, this.state.fetchedImage, nameEn, descriptionEn);
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    render() {
        return (
            <div className={'add-new-project-or-image-container'}>
                <div onClick={this.showModal}>
                    <Icon type="plus" className={'add-new-project-icon'}/>
                    <p className={'add-new-project-text'}>Add new project</p>
                </div>

                <ProjectsCreateForm
                    imageFetcher = {this.imageFetcher}
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
            </div>
        );
    }
}

export default NewProjectModal;