import React, {Component} from 'react';
import qs from "qs";
import {Icon, Collapse, Modal} from "antd";
import axios from 'axios';

const {Panel} = Collapse;

class AdminPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projectsList: {},
            projectsIdsNames: {},

            AddProjectModalText: 'Content of the project modal',
            AddProjectModalVisible: false,
            AddProjectModalConfirmLoading: false,

            AddImageModalText: 'Content of the image modal',
            AddImageModalVisible: false,
            AddImageModalConfirmLoading: false,

            EditProjectModalText: 'Content of the project modal',
            EditProjectModalVisible: false,
            EditProjectModalConfirmLoading: false,
        }
    }

    componentDidMount() {
        this.loadData();
    }

    showAddProjectModal = () => {
        this.setState({
            AddProjectModalVisible: true,
        });
    };
    handleAddProjectModalOk = (data) => {
        this.setState({
            AddProjectModalText: 'The modal will be closed after two seconds',
            AddProjectModalConfirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                AddProjectModalVisible: false,
                AddProjectModalConfirmLoading: false,
            });
        }, 2000);
    };
    handleAddProjectModalCancel = () => {
        this.setState({
            AddProjectModalVisible: false,
        });
    };
    showAddImageModal = () => {
        this.setState({
            AddImageModalVisible: true,
        });
    };
    handleAddImageModalOk = (data) => {
        this.setState({
            AddImageModalText: 'The modal will be closed after two seconds',
            AddImageModalConfirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                AddImageModalVisible: false,
                AddImageModalConfirmLoading: false,
            });
        }, 2000);
    };
    handleAddImageModalCancel = () => {
        this.setState({
            AddImageModalVisible: false,
        });
    };

    showEditProjectModal = () => {
        this.setState({
            EditProjectModalVisible: true,
        });
    };
    handleEditProjectModalOk = (data) => {
        this.setState({
            EditProjectModalText: 'The modal will be closed after two seconds',
            EditProjectModalConfirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                EditProjectModalVisible: false,
                EditProjectModalConfirmLoading: false,
            });
        }, 2000);
    };
    handleEditProjectModalCancel = () => {
        this.setState({
            EditProjectModalVisible: false,
        });
    };

    loadData = async () => {
        let selectedData = await this.selectData();
        let projectsIdsNames = [];

        this.setState({
            projectsList: selectedData
        });
    };

    async cmsAction(whatToDo, cmsData = 'data') {
        let stringifiedData = qs.stringify({
            'cmsAction': whatToDo,
            'cmsData': cmsData
        });
        return await axios.post('https://gamowere.ge/php/cmsData.php', stringifiedData);
    }

    selectData = async () => {
        let selectedData = await this.cmsAction('select');
        let objectOfProjects = {};
        let dataToSend = [];
        let dataToSendIndex = -1;

        for (let i = 0; i < selectedData.data.length; i++) {
            let dataI = selectedData.data[i];

            if (dataI.Projects_id in objectOfProjects) {
                objectOfProjects[dataI.Projects_id].push(dataI.Images_id);
                dataToSend[dataToSendIndex].push([dataI.Images_id, dataI.Image_description, dataI.Image_url]);
            } else {
                objectOfProjects[dataI.Projects_id] = [dataI.Images_id];
                dataToSend.push([dataI.Projects_id, dataI.Project_name, dataI.Project_description, dataI.Project_image_url, [dataI.Images_id, dataI.Image_description, dataI.Image_url]]);
                dataToSendIndex += 1;
            }
        }

        // return selectedData.data;
        return dataToSend;
    };
    insertData = async (projectName, description, url, ProjectId = '0') => {
        let dataToInsert;

        if (ProjectId !== '0') {
            dataToInsert = {
                ProjectOrImage: 'image',
                Project_id_in_images: ProjectId,
                Image_description: description,
                Image_url: url,
            };
        } else {
            dataToInsert = {
                ProjectOrImage: 'project',
                Project_name: projectName,
                Project_description: description,
                Project_image_url: url,
            }
        }

        let insertedData = await this.cmsAction('insert', dataToInsert);
    };
    updateData = async (idToUpdate, projectName, description, url, projectId = '0') => {
        let dataToUpdate;

        if (projectId !== '0') {
            dataToUpdate = {
                idToUpdate: idToUpdate,
                ProjectOrImage: 'image',
                Project_id_in_images: projectId,
                Image_description: description,
                Image_url: url,
            };
        } else {
            dataToUpdate = {
                idToUpdate: idToUpdate,
                ProjectOrImage: 'project',
                Project_name: projectName,
                Project_description: description,
                Project_image_url: url,
            }
        }

        let updatedData = await this.cmsAction('update', dataToUpdate);
    };
    deleteData = async (pOrI, idToDelete) => {
        let dataToDelete = {
            'pOrI': pOrI,
            'idToDelete': idToDelete
        };

        let deletedData = await this.cmsAction('delete', dataToDelete);
    };

    logout = async () => {
        await axios.post('https://gamowere.ge/php/logout.php');
        window.location.href = '/admin';
    };

    projectImageChangeHandler = event => {
        console.log(event);
    };

    render() {
        const {projectsList} = this.state;
        const {AddProjectModalText, AddProjectModalVisible, AddProjectModalConfirmLoading} = this.state;
        const {AddImageModalText, AddImageModalVisible, AddImageModalConfirmLoading} = this.state;
        const {EditProjectModalText, EditProjectModalVisible, EditProjectModalConfirmLoading} = this.state;


        return (
            <div>
                <div className={'admin-page-space-filler'}></div>
                <Icon type="poweroff" onClick={this.logout} className={'logout-button'}/>
                <div className={'add-new-container'}>
                    <div className={'add-new-project-or-image-container'} onClick={() => this.showAddProjectModal()}>
                        <Icon type="plus" className={'add-new-project-icon'}/>
                        <p className={'add-new-project-text'}>Add new project</p>
                    </div>
                    <Modal
                        title="Add Project"
                        visible={AddProjectModalVisible}
                        onOk={this.handleAddProjectModalOk}
                        confirmLoading={AddProjectModalConfirmLoading}
                        onCancel={this.handleAddProjectModalCancel}
                    >
                        <p>{AddProjectModalText}</p>
                    </Modal>
                    <div className={'add-new-project-or-image-container'} onClick={() => this.showAddImageModal()}>
                        <Icon type="plus" className={'add-new-project-icon'}/>
                        <p className={'add-new-project-text'}>Add new image</p>
                    </div>
                    <Modal
                        title="Add Image"
                        visible={AddImageModalVisible}
                        onOk={this.handleAddImageModalOk}
                        confirmLoading={AddImageModalConfirmLoading}
                        onCancel={this.handleAddImageModalCancel}
                    >
                        <p>{AddImageModalText}</p>
                    </Modal>
                </div>

                <div className={'admin-table-container'}>
                    {
                        projectsList.length ? (
                            <Collapse>{
                                projectsList.map((project, index) => {
                                    let projectSliced = project.slice(4);
                                    return (
                                        <Panel className={'image-panel'} header={project[1]} key={index} extra={(
                                            <div>
                                                <Modal
                                                    title="Edit Project"
                                                    visible={EditProjectModalVisible}
                                                    onOk={this.handleEditProjectModalOk}
                                                    confirmLoading={EditProjectModalConfirmLoading}
                                                    onCancel={this.handleEditProjectModalCancel}
                                                >
                                                    <p>{EditProjectModalText}</p>
                                                    <div>
                                                        <input type="file" name="projectImage" accept="image/*"
                                                               defaultValue={project[3]} onChange={this.projectImageChangeHandler}/>
                                                    </div>
                                                </Modal>
                                                <Icon
                                                    className={'admin-table-icon'}
                                                    type="edit"
                                                    onClick={async event => {
                                                        event.stopPropagation();
                                                        await this.showEditProjectModal();
                                                        //მოდალის გახსნა, ინფოს ჩაწერა და ვალუების დაბრუნება
                                                        // await this.updateData(project[0], project[1], [project[2], project[3]])
                                                    }}
                                                />
                                                <Icon
                                                    className={'admin-table-icon'}
                                                    type="delete"
                                                    onClick={async event => {
                                                        event.stopPropagation()
                                                        await this.deleteData('project', project[0]);
                                                        this.loadData();
                                                    }}
                                                />
                                            </div>
                                        )}>
                                            <div className={'image-panel-expanded'}>
                                                <div className={'project-image-description-container'}>
                                                    <div className={'project-image'}>{
                                                        <img src={project[3]}/>
                                                    }</div>
                                                    <div className={'project-description'}>
                                                        {
                                                            project[2]
                                                        }
                                                    </div>
                                                </div>

                                                <div className={'images-container'}>{
                                                    projectSliced.map((image, indexOfImage) => {
                                                        return (
                                                            <div className={'image-container'} style={{
                                                                backgroundImage: 'url(' + image[2] + ')',
                                                                flex: '150px'
                                                            }} key={indexOfImage}>
                                                                <Icon
                                                                    className={'admin-table-icon'}
                                                                    type="delete"
                                                                    onClick={async event => {
                                                                        await this.deleteData('image', image[0]);
                                                                        this.loadData();
                                                                    }}
                                                                />
                                                            </div>
                                                        )
                                                    })
                                                }</div>
                                            </div>


                                        </Panel>
                                    )
                                })}
                            </Collapse>
                        ) : (
                            <p className={'no-progects-added'}>
                                No projects are added yet, click Add project.
                            </p>
                        )
                    }
                </div>


                <p style={{marginTop: '100vh'}}>Admin page</p>
                <button
                    onClick={this.selectData}>
                    Select
                </button>
                <button
                    onClick={(e) => {
                        let name = 'image';
                        let description = 'description';
                        let url = 'https://gamowere.ge/images/11.jpeg';
                        let projectId = '13';
                        this.insertData(name, description, url, projectId);
                    }}>
                    Insert
                </button>
                <button
                    onClick={(e) => {
                        let name = 'nameeeeeeed';
                        let description = 'description';
                        let url = 'url';
                        let projectId = '0';
                        let idToUpdate = '2';
                        this.updateData(idToUpdate, name, description, url, projectId);
                    }}>
                    Update
                </button>
                <button
                    onClick={(e) => {
                        let pOrI = 'project';
                        let idToDelete = '9';

                        this.deleteData(pOrI, idToDelete)
                    }}>
                    Delete
                </button>
            </div>
        )
    }
}

export default AdminPage;