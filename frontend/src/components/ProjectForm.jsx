import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProjectForm = ({onSubmit,initialData={},submitLabel}) => {

    const [name, setName]=useState('');
    const [description, setDescription]=useState('');
    const [memberIds, setMemberIds] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

    useEffect(()=>{
        if(initialData){
            setName(initialData.name || '');
            setDescription(initialData.description || '');
            setMemberIds(initialData.member_id || []);
        }
    },[initialData]);

    useEffect(() => {
    // Fetch all users for member selection
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/users/`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        });
        setAllUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

    const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name,
      description,
      member_id: memberIds
    });
    setName('');
    setDescription('');
    setMemberIds([]);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <label className="form-label">Project Name</label>
        <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Select Members</label>
        <select
          className="form-select"
          multiple
          value={memberIds}
          onChange={(e) =>
            setMemberIds([...e.target.selectedOptions].map((opt) => parseInt(opt.value)))
          }
        >
          {allUsers.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
        </div>
      <button className="btn btn-primary" type="submit">{submitLabel || 'Submit'}</button>
    </form>
  )
}

export default ProjectForm