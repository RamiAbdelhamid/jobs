import React from 'react'
import axios from 'axios'
 import JobsList from '../components/Job/JobsList'
axios.defaults.baseURL = "https://jobs-l5nc.onrender.com";
function Dashboard() {
  return (
    <div>
      <JobsList initialStatusFilter={'false'} showFilters={true} />
    </div>
  )
}

export default Dashboard