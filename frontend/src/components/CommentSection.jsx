import React, { useEffect, useState } from 'react';
import { fetchComments,createComment } from '../api/commentApi';

const CommentSection = ({taskId}) => {

    const [comments, setComments]= useState([]);
    const [newComment, setNewComment]= useState('');

    const loadComments = async () =>{
        try{
            const response = await fetchComments(taskId);
            console.log("response data: ",response.data)
            setComments(Array.isArray(response.data) ? response.data : []);
        }catch (error){
            console.error('Error fetching comments:', error);
        }
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!newComment.trim()) return;

        try{
            const response = await createComment({
                task: taskId,
                content: newComment,
            });
            setComments([...comments,response.data]);
            setNewComment('');
        }catch (error){
            console.error('Error creating comment:', error);
        }
    };

    useEffect(()=>{
        console.log("loaded taskid:", taskId)
        loadComments();
    },[taskId]);

  return (
    <div className='mt-3'>
        <h5>Comments</h5>
        <ul className='list-group mb-3'>
            {comments.map((comment)=>(
                <li key={comment.id} className='list-group-item'>
                    <strong>{comment.user.username}: </strong>{comment.content}
                    <br/>
                    <small className='text-muted'>{new Date(comment.created_at).toLocaleString()} </small>
                </li>
            ))}
        </ul>
        <form onSubmit={handleSubmit} className='d-flex gap-2'>
            <input 
            type='text'
            className='form-control'
            value={newComment}
            onChange={(e)=>setNewComment(e.target.value)}
            placeholder='Write a comment....'
            />
            <button className='btn btn-primary' type='submit'>
                Add
            </button>
        </form>
    </div>
  )
}

export default CommentSection