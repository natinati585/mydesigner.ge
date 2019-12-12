import {Modal, Form, Icon, Upload, message, Select} from 'antd';
import React from "react";

const {Option} = Select;

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

const ImagesCreateForm = Form.create({name: 'form_in_modal'})(
    class extends React.Component {

        state = {
            loading: false,
            uploadedImage: null,
        };

        onChange = (value) => {
            this.props.projectFetcher(value);
        };
        onBlur = () => {
        };
        onFocus = () => {
        };
        onSearch = (val) => {
        };

        handleChange = info => {
            if (info.file.status === 'uploading') {
                this.setState({loading: true});
                return;
            }
            if (info.file.status === 'done') {
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
            const projects = this.props.projects;
            const projectsOrganised = [];

            if (projects) {
                for (let i = 1; i < projects.length; i += 2) {
                    projectsOrganised.push([projects[i], projects[i - 1]]);
                }
            }

            const uploadButton = (
                <div>
                    <Icon type={this.state.loading ? 'loading' : 'plus'}/>
                    <div className="ant-upload-text">Upload</div>
                </div>
            );
            const {imageUrl} = this.state;
            const {visible, onCancel, onCreate, form} = this.props;
            const {getFieldDecorator} = form;

            return (
                <Modal
                    visible={visible}
                    title="Add Image"
                    okText="Create"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Form.Item label="Upload image">
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                beforeUpload={beforeUpload}
                                onChange={this.handleChange}
                            >
                                {imageUrl ? <img src={imageUrl} alt="avatar" style={{width: '100%'}}/> : uploadButton}
                            </Upload>
                        </Form.Item>
                        <Form.Item>
                            <Select
                                required={true}
                                showSearch
                                style={{width: 200}}
                                placeholder="Select a project"
                                optionFilterProp="children"
                                onChange={this.onChange}
                                onFocus={this.onFocus}
                                onBlur={this.onBlur}
                                onSearch={this.onSearch}
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {
                                    projectsOrganised && projectsOrganised.map((project, index) => {
                                        return (
                                            <Option value={project[1]} key={project[1]}>{project[0]}</Option>
                                        )
                                    })
                                }

                            </Select>
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
        fetchedImage: null,
        fetchedProject: null
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
    projectFetcher = (fetchedProject) => {
        this.setState({
            fetchedProject: fetchedProject
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

            let name = 'image';
            let description = 'description';
            let url = 'https://mydesigner.ge/images/callNati.jpeg';
            let projectId = this.state.fetchedProject;

            if(projectId && this.state.fetchedImage){
                this.props.valuesFetcher(name, description, url, projectId, this.state.fetchedImage);
            }
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
                    <p className={'add-new-project-text'}>Add new Image</p>
                </div>

                {
                    this.state.visible && (<ImagesCreateForm
                        projects={this.props.projects}
                        projectFetcher={this.projectFetcher}
                        imageFetcher={this.imageFetcher}
                        wrappedComponentRef={this.saveFormRef}
                        visible={true}
                        onCancel={this.handleCancel}
                        onCreate={this.handleCreate}
                    />)

                }

            </div>
        );
    }
}

export default NewImageModal;