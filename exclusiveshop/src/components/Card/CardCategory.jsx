import React from 'react'

export default function CardCategory({ data, children, browseByCategory }) {
  return (
    <div
      className='flex h-[150px] w-[150px] min-w-[150px] flex-col items-center justify-center rounded border-[1px] border-neutral-300 transition-colors duration-300 hover:cursor-pointer hover:bg-red-500 hover:text-white'
      onClick={() => browseByCategory(data._id)}
    >
      {children}
      <p className='mt-3 text-center capitalize'>{data.name}</p>
    </div>
  )
}
