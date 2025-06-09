import React from 'react'
import { Link } from 'react-router-dom'
import './Dashboard.css'

const Dashboard = () => {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1 >Welcome to the Dashboard</h1>
      <p>Select an option below:</p>
      <div style={{ marginTop: "20px" }}>
        <Link to="/tasks">
          <button style={{ padding: "10px 20px", marginLeft:"10px"}}>Go to Tasks</button>
        </Link>
        <Link to="/projects">
          <button style={{ padding: "10px 20px", marginLeft:"10px"}}>Go to Projects</button>
        </Link>
        <Link to="/notifications">
          <button style={{ padding: "10px 20px",marginLeft:"10px" }}>Go to Notifications</button>
        </Link>
      </div>
    </div>
  )
}

export default Dashboard