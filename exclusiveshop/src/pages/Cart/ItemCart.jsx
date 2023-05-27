import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'

export default function ItemCart({ data, amountItem, setTotal, idItem, handleRemoveProd }) {
  const [amount, setAmount] = useState(amountItem)

  const handleChangeInput = (value) => {
    const prevTotal = Number(amount) * data.price * (1 - data.discount / 100)
    const newTotal = Number(value) * data.price * (1 - data.discount / 100)
    setAmount(value)
    setTotal((prev) => prev - prevTotal + newTotal)
  }

  useEffect(() => {
    setTotal((prev) => prev + Number(amount) * data.price * (1 - data.discount / 100))
  }, [])

  return (
    <div className='group my-5 flex h-[100px] items-center gap-3 rounded px-2 py-5 text-center shadow'>
      <div className='relative flex basis-1/4 items-center justify-center gap-x-3 overflow-hidden'>
        <img
          src={`${data.imagesUrl[0]}`}
          alt=''
          className='inline-block max-h-[80%] max-w-[60px]'
          crossOrigin='anonymous'
        />
        <span className='inline-block w-[calc(100%-60px)] overflow-hidden overflow-ellipsis whitespace-nowrap'>
          {data.name}
        </span>
      </div>
      <p className='basis-1/4'>${data.price * (1 - data.discount / 100)}</p>
      <div className='basis-1/4'>
        <input
          className='border-[1px] text-center'
          type='number'
          value={amount}
          onChange={(e) => handleChangeInput(e.target.value)}
          min={1}
          max={99}
        />
      </div>
      <div className='relative basis-1/4'>
        <button className='absolute right-0 hidden group-hover:inline-block' onClick={() => handleRemoveProd(idItem)}>
          <FontAwesomeIcon icon={faXmark} className='text-xl text-red-500' />
        </button>
        <p>${Number(amount) * (1 - data.discount / 100) * data.price}</p>
      </div>
    </div>
  )
}
