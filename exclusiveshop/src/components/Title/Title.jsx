export default function Title({ children }) {
  return (
    <div className='flex w-max items-center'>
      <span className='mr-4 inline-block h-8 w-4 rounded bg-red-600'></span>
      <span className='inline-block font-semibold leading-8 text-red-600'>{children}</span>
    </div>
  )
}
