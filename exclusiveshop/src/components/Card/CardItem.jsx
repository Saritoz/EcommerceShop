import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Rating from '../Rating'

export default function CardItem({
  type,
  action,
  data,
  handleAddCart,
  handleAddWishList = () => {
    return
  },
  handleRemWishList = () => {
    return
  },
  viewProduct
}) {
  return (
    <div className='w-[225px]'>
      <div className='group relative h-[200px] w-[225px] rounded bg-neutral-100'>
        {type?.toLowerCase() === 'saleoff' && (
          <div className='absolute left-3 top-3 rounded bg-red-500 px-2 py-[2px] text-white'>{`-${data?.discount}%`}</div>
        )}
        {type?.toLowerCase() === 'new' && (
          <div className='absolute left-3 top-3 rounded bg-green-400 px-2 py-[2px] capitalize text-white'>new</div>
        )}
        <div
          className='flex h-full w-full items-center justify-center'
          onClick={() => viewProduct(data.name, data._id)}
        >
          <img src={data.imagesUrl[0]} alt='' className='max-h-[80%] max-w-[80%]' crossOrigin='anonymous' />
        </div>
        {action === 'canwishlist' && (
          <div
            className='absolute right-3 top-3 flex h-[32px] w-[32px] items-center justify-center rounded-full bg-white p-1 hover:cursor-pointer'
            onClick={() => handleAddWishList(data._id)}
          >
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' className='w-[20px]'>
              <path d='M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z' />
            </svg>
          </div>
        )}
        {action === 'canremove' && (
          <div
            className='absolute right-3 top-3 flex h-[32px] w-[32px] items-center justify-center rounded-full bg-white hover:cursor-pointer'
            onClick={() => handleRemWishList(data._id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </div>
        )}
        <button
          className='absolute bottom-0 hidden w-full select-none bg-black py-1 text-white transition-all duration-300 hover:bg-neutral-700 group-hover:block'
          onClick={() => handleAddCart(data._id)}
        >
          Add to Cart
        </button>
      </div>
      <div className='flex w-full flex-col gap-y-1 font-semibold'>
        <p className='overflow-hidden overflow-ellipsis whitespace-nowrap'>{data.name}</p>
        <p>
          <span className='mr-4 text-red-500'>
            {type?.toLowerCase() === 'saleoff'
              ? `$${(data.price * (1 - data.discount / 100)).toFixed(2)}`
              : `$${data.price}`}
          </span>
          {type?.toLowerCase() === 'saleoff' && (
            <span className='text-neutral-400 line-through'>{`$${data.price}`}</span>
          )}
        </p>
        <div className='flex items-center gap-x-1 text-sm'>
          <Rating rating={data.rating} id={data._id} />
          <p className='text-neutral-400'>{`(${data.amountRating})`}</p>
        </div>
      </div>
    </div>
  )
}
