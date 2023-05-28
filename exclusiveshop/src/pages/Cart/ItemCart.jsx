import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'

export default function ItemCart({ data, amountItem, setTotal, idItem, handleRemoveProd }) {
  const [amount, setAmount] = useState(amountItem)

  const handleChangeInput = (value) => {
    const prevTotal = Number(amount) * data.price * (1 - data.discount / 100)
    const newTotal = Number(value) * data.price * (1 - data.discount / 100)
    console.log(prevTotal, newTotal)
    setAmount(value)
    setTotal((prev) => prev - Number(prevTotal.toFixed(2)) + Number(newTotal.toFixed(2)))
  }

  const handleRemove = (id) => {
    const totalPrice = Number(amount) * data.price * (1 - data.discount / 100)
    setTotal((prev) => prev - Number(totalPrice.toFixed(2)))
    handleRemoveProd(id)
  }

  useEffect(() => {
    setTotal((prev) => prev + Number(amount) * Number((data.price * (1 - data.discount / 100)).toFixed(2)))
  }, [])

  return (
    <div className='group my-5 flex h-[100px] items-center gap-3 rounded px-2 py-5 text-center shadow'>
      <div className='relative flex basis-1/4 items-center justify-center gap-x-3 overflow-hidden'>
        <div className='inline-block h-full w-[60px]'>
          <img src={`${data.imagesUrl[0]}`} alt='' className='max-h-[80%] max-w-full' crossOrigin='anonymous' />
        </div>
        <span className='inline-block w-[calc(100%-60px)] overflow-hidden overflow-ellipsis whitespace-nowrap'>
          {data.name}
        </span>
      </div>
      <p className='basis-1/4'>${(data.price * (1 - data.discount / 100)).toFixed(2)}</p>
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
        <button className='absolute right-0 hidden group-hover:inline-block' onClick={() => handleRemove(idItem)}>
          <FontAwesomeIcon icon={faXmark} className='text-xl text-red-500' />
        </button>
        <p>${(Number(amount) * (1 - data.discount / 100) * data.price).toFixed(2)}</p>
      </div>
    </div>
  )
}
