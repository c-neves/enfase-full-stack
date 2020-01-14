import React from 'react'
import { Icon } from 'antd'
import { navigate } from '@reach/router'
import './ReturnArrow.css'

export default function ReturnArrow() {
  return (
    <div className='ReturnArrow' onClick={() => navigate('..')}>
      <Icon type='left' />
    </div>
  )
}
