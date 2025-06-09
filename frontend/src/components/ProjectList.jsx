import React, { useEffect, useState } from 'react';
import { fetchProjects, deleteProject,createProject,updateProject } from '../api/projectApi';
import ProjectForm from './ProjectForm';
import { updateTask } from '../api/taskApi';

const ProjectList = () => {

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingProject, setEtidingProject]= useState(null);

    const loadProjects = async () => {
        try {
            const response = await fetchProjects();
            // console.log("api response:", response.data);
            setProjects(Array.isArray(response.data) ? response.data : []);
            setLoading(false);
        } catch (error) {
            console.error('Error while fetching projects:', error);
            setLoading(false);
        }
    };

    const handleCreate = async (projectData) =>{
        // console.log("Submitting project:", projectData);
        try{
            const response = await createProject(projectData);
            setProjects(prev => [...prev, response.data]);
        }catch (error){
            console.error("error while creating project:", error);
        }
    };

    const handleUpdate = async (projectData) =>{
        try{
            const response = await updateProject(editingProject.id,projectData);
            setProjects(
                projects.map((p)=>(p.id===editingProject.id ? response.data :p))
            );
            setEtidingProject(null);
        }catch (error){
            console.error("Error while updating project:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this project?')) return;
        try {
            await deleteProject(id);
            setProjects(projects.filter(project => project.id !== id));
        } catch (error) {
            console.error("Error while deleting project:", error);
        }
    };

    useEffect(() => {
        loadProjects();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="container mt-4">
            <h2 className="text-2xl font-semibold mb-4 text-center">My Projects</h2>


            <ProjectForm
            onSubmit={editingProject ? handleUpdate : handleCreate}
            initialData={editingProject}
            submitLabel={editingProject ? 'Update Project' : 'Create Project'}
            />

            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Project Name</th>
                        <th scope="col">Description</th>
                        <th score='col'>Members</th>
                        <th scope='col'>Creation Time</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project, index) => (
                        <tr key={project.id || index}> 
                            <th scope="row">{index + 1}</th>
                            <td>{project.name}</td>
                            <td>{project.description?.substring(0, 100)}</td>
                            <td>{new Date(project.created_at).toLocaleString()}</td>
                            <td>{project.members && project.members.length>0?(
                                project.members.map(member=>(
                                    <span key={member.id} className='badge bg-secondary me-1'>
                                        {member.username}
                                    </span>
                                ))
                            ):(
                                <span className='text-muted'>No members</span>
                            )} </td>
                            <td>
                                <button
                                className='btn btn-sm btn-warning me-2 mb-2'
                                onClick={()=>setEtidingProject(project)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(project.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


        </div>

    )
}

export default ProjectList