import { Link, useLocation } from 'react-router-dom'

export default function BreadCrumb() {
  const { pathname } = useLocation()
  const paths = pathname.split('/').filter((path) => path !== '')

  return (
    <ol className='my-5 flex text-xl'>
      <li>
        <Link to={'/'} className='text-gray-500'>
          Home
        </Link>
        <span className='mx-3'>{'/'}</span>
      </li>
      {paths.map((path, index) => {
        const route = `/${paths.slice(0, index + 1).join('/')}`
        const isLast = index === paths.length - 1
        return (
          <li key={route} className='capitalize'>
            {isLast ? (
              <span className='inline-block max-w-[100px] overflow-hidden overflow-ellipsis whitespace-nowrap sm:max-w-[300px]'>
                {decodeURIComponent(path)}
              </span>
            ) : (
              <>
                <Link to={route} className='text-gray-500'>
                  {path}
                </Link>
                <span className='mx-3'>{'/'}</span>
              </>
            )}
          </li>
        )
      })}
    </ol>
  )
}
