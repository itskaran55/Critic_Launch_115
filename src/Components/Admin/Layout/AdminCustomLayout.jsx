import React from 'react'
import AdminNavbar from './AdminNavbar'

const AdminCustomLayout = ({children}) => {
  return (
    <div>
      <AdminNavbar/>
      <div>
        {children}
      </div>
      {/* <Footer/> */}
    </div>
  )
}

export default AdminCustomLayout
