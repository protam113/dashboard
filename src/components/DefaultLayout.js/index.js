import React, { useState } from 'react'
import Sidebar from '../Sidebar'
import Navbar from '../Nav'

const DefaultLayout = ({isAuthenticated, handleLogout, children}) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

  return (
<div className="flex h-screen">
    <div className={`transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"}`}>
        <Sidebar isAuthenticated={isAuthenticated} handleLogout={handleLogout} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
    </div>
    <div className="flex flex-col w-full">
        <Navbar />
        <div className="flex-grow p-4 md:p-8 lg:p-12 overflow-y-auto">
            {children}
        </div>
    </div>
</div>

  )
}

export default DefaultLayout