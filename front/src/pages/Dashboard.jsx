import React from 'react'
import axios from 'axios'
 import JobsList from '../components/Job/JobsList'
axios.defaults.baseURL = "http://localhost:3000";
function Dashboard() {
  return (
    <div>
      <JobsList initialStatusFilter={'false'} showFilters={true} />
    </div>
  )
}

export default Dashboard