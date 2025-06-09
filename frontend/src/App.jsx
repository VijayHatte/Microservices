const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";

import './App.css'
import Notifications from "./pages/Notifications";
import ProjectList from "./components/ProjectList";
import CommentSection from "./components/CommentSection";
import { useState } from "react";
// import TaskList from './components/TaskList';

function App() {

  const [selectedTask, setSelectedTask]=useState(null);
  

  return (
   <Router>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/tasks" element={<Tasks/>}/>
      <Route path="/notifications" element={<Notifications/>}/>
      <Route path="/projects" element={<ProjectList/>}/>
      <Route path="/comments" element={<CommentSection taskId={selectedTask?.id} /> }/>
    </Routes>
   </Router>
  )
}

export default App
