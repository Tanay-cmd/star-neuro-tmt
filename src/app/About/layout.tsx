import React from 'react'

const Layout = ({ children }: {children: React.ReactNode}) => {
  return (
    <div>
        {children}
        <h1 className="text-3xl">Layout</h1>
        
        </div>
    
  )
}

export default Layout