import React from 'react'
import './DesktopLayout.css'

export default function DesktopLayout({ children }) {
  return (
    <div className='DesktopLayout'>
      <div className='DesktopLayout-content'>
        {children}
      </div>
    </div>
  )
}
