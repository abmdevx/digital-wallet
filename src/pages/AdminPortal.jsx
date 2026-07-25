import React from 'react'
import AdminHeader from '../components/Header/AdminHeader'
import AdminUserTable from '../components/AdminUsersTable'
import { useNavigate } from 'react-router-dom'

function AdminPortal() {

  return (
    <div>
        <AdminUserTable />
    </div>
  )
}

export default AdminPortal