import React from 'react'

export default function DisplayTime({ content, value }) {
  return (
    <div>
      <p className='text-base font-semibold capitalize'>{content}</p>
      <p className='text-right text-2xl font-semibold'>{value}</p>
    </div>
  )
}
