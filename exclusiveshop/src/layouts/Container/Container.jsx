import React from 'react'

export default function Container({ customClass, children }) {
  return <div className={`w-full px-5 lg:mx-auto lg:w-[80%] ${customClass}`}>{children}</div>
}
