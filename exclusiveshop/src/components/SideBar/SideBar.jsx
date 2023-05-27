export default function SideBar({ customClass, data = [], browseByCategory }) {
  return (
    <div className={`${customClass} border-r-[1px] border-neutral-300`}>
      {data.map((item) => (
        <li
          key={item._id}
          className='mb-3 w-max border-b-[1px] border-transparent font-normal capitalize transition-colors duration-300 hover:cursor-pointer hover:border-neutral-300 hover:text-neutral-400'
          onClick={() => browseByCategory(item._id)}
        >
          {item.name}
        </li>
      ))}
    </div>
  )
}
