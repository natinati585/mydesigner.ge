import React, {Component} from 'react';
import {Icon, Collapse, Modal, Input} from "antd";
import axios from 'axios';

import NewProjectModal from './NewProjectModal'
import NewImageModal from './NewImageModal'

const {TextArea} = Input;
const {Panel} = Collapse;

class AdminPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projectsList: [],

            EditProjectModalVisible: false,
            EditProjectModalConfirmLoading: false,
            editProjectName: null,
            editProjectDescription: null,
            editProjectImageUpload: null,

            uploadedImage: null,
            projectsOnly: null
        }
    }

    componentDidMount() {
        this.loadData();
    }

    showEditProjectModal = (project) => {
        this.setState({
            EditProjectModalVisible: true,
            editProjectName: project[1],
            editProjectDescription: project[2],
        });
    };
    handleEditProjectModalOk = (data) => {
        let name = data.name;
        let description = data.description;
        let url = 'project url to be updated';
        let projectId = '0';
        let idToUpdate = data.id;
        let updateFile = data.image;

        this.updateData(idToUpdate, name, description, url, projectId, updateFile);

        this.setState({
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

        this.setState({
            projectsList: selectedData
        });
    };

    async cmsAction(whatToDo, cmsData = 'data', image = null) {
        let formData = new FormData();

        formData.append('cmsAction', whatToDo);
        formData.append('cmsData', cmsData);

        if (image !== null) {
            formData.append('image', image, image.name);
        }

        return await axios.post('https://gamowere.ge/php/cmsData.php', formData);

    }

    selectData = async () => {
        let selectedData = await this.cmsAction('select');
        let objectOfProjects = {};
        let dataToSend = [];
        let dataToSendIndex = -1;
        let projectsOnly = selectedData.data[0];

        for (let i = 1; i < selectedData.data.length; i++) {
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
        this.setState({
            projectsOnly: projectsOnly
        });
        return dataToSend;
    };
    insertData = async (projectName, description, url, ProjectId = '0', uploadedImage = null) => {
        let dataToInsert;

        if (ProjectId !== '0') {
            dataToInsert = {
                ProjectOrImage: 'image',
                Project_id_in_images: ProjectId,
                Image_description: description,
                Image_url: "to be set with file",
            };
        } else {
            dataToInsert = {
                ProjectOrImage: 'project',
                Project_name: projectName,
                Project_description: description,
                Project_image_url: "to be set with file",
            }
        }

        let insertedData = await this.cmsAction('insert', JSON.stringify(dataToInsert), uploadedImage);
        this.loadData();
    };
    updateData = async (idToUpdate, projectName, description, url, projectId = '0', uploadedImage = null) => {
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

        let updatedData = await this.cmsAction('update', JSON.stringify(dataToUpdate), uploadedImage);
        this.loadData();
    };
    deleteData = async (pOrI, idToDelete, imageUrl) => {

        let lI = imageUrl.lastIndexOf('/');
        let imagePureUrl = imageUrl.substring(lI + 1);

        let dataToDelete = {
            'pOrI': pOrI,
            'idToDelete': idToDelete,
            'imageUrl': imagePureUrl
        };

        let deletedData = await this.cmsAction('delete', JSON.stringify(dataToDelete));
    };

    logout = async () => {
        await axios.post('https://gamowere.ge/php/logout.php');
        window.location.href = '/admin';
    };

    editProjectImageUploadHandler = (event) => {
        this.setState({
            editProjectImageUpload: event.target.files[0]
        })
    };

    render() {
        const {projectsList, projectsOnly} = this.state;
        const {EditProjectModalVisible, EditProjectModalConfirmLoading} = this.state;

        return (
            <div>
                <div className={'admin-page-space-filler'}></div>
                <Icon type="poweroff" onClick={this.logout} className={'logout-button'}/>
                <div className={'add-new-container'}>
                    <NewProjectModal valuesFetcher={this.insertData}/>
                    {
                        this.state.projectsOnly ?
                            <NewImageModal valuesFetcher={this.insertData} projects={this.state.projectsOnly}/> : null
                    }
                </div>

                <div className={'admin-table-container'}>
                    {
                        projectsList.length ? (
                            <Collapse>{
                                projectsList.map((project, index) => {
                                    let projectSliced = project.slice(4);
                                    return (
                                        <Panel className={'image-panel'} header={project[1]} key={index} extra={(
                                            <div onClick={(e) => {
                                                e.stopPropagation()
                                            }}>
                                                <Modal
                                                    title="Edit Project"
                                                    visible={EditProjectModalVisible}
                                                    onOk={() => {
                                                        var n = project[3].lastIndexOf('/');
                                                        var urlOfImage = project[3].substring(n + 1);

                                                        let data = {
                                                            name: project[1],
                                                            description: project[2],
                                                            image: null,
                                                            id: project[0]
                                                        };

                                                        if (this.state.editProjectName) {
                                                            data.name = this.state.editProjectName;
                                                        }
                                                        if (this.state.editProjectDescription) {
                                                            data.description = this.state.editProjectDescription;
                                                        }
                                                        if (this.state.editProjectImageUpload) {
                                                            data.image = this.state.editProjectImageUpload;
                                                        }

                                                        this.handleEditProjectModalOk(data);
                                                    }}
                                                    confirmLoading={EditProjectModalConfirmLoading}
                                                    onCancel={this.handleEditProjectModalCancel}
                                                >
                                                    <div>
                                                        <Input type={"text"} placeholder={"Project name"}
                                                               value={this.state.editProjectName}
                                                               className={"update-project-input"}
                                                               onChange={(e) => {
                                                                   this.setState({
                                                                       editProjectName: e.target.value
                                                                   });
                                                               }}/>
                                                        <TextArea rows={4} placeholder={"Project description"}
                                                                  value={this.state.editProjectDescription}
                                                                  className={"update-project-input"}
                                                                  onChange={(e) => {
                                                                      this.setState({
                                                                          editProjectDescription: e.target.value
                                                                      });
                                                                  }}/>
                                                        <input type="file" name="projectImage"
                                                               className={"update-project-input"}
                                                               onChange={this.editProjectImageUploadHandler}/>
                                                    </div>
                                                </Modal>
                                                <Icon
                                                    className={'admin-table-icon'}
                                                    type="edit"
                                                    onClick={async event => {
                                                        event.stopPropagation();
                                                        await this.showEditProjectModal(project);
                                                    }}
                                                />
                                                <Icon
                                                    className={'admin-table-icon'}
                                                    type="delete"
                                                    onClick={async event => {
                                                        event.stopPropagation();
                                                        await this.deleteData('project', project[0], project[3]);
                                                        this.loadData();
                                                    }}
                                                />
                                            </div>
                                        )}>
                                            <div className={'image-panel-expanded'}>
                                                <div className={'project-image-description-container'}>
                                                    <div className={'project-image'}>{
                                                        <img alt="iimage" src={project[3]}/>
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
                                                                        await this.deleteData('image', image[0], image[2]);
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
            </div>
        )
    }
}

export default AdminPage;