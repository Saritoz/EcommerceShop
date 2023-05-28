import {
  faBagShopping,
  faBars,
  faCartShopping,
  faCheck,
  faChevronDown,
  faCircleUser,
  faMagnifyingGlass,
  faRightFromBracket,
  faUser
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { languages } from '../../constants/languages'
import Container from '../Container'
import Divider from '../../components/Divider'
import { useDispatch, useSelector } from 'react-redux'

import { logoutUser } from '../../redux/slices/userSlice'

export default function Header() {
  const user = useSelector((state) => state.userStore.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [toggleUserMenu, setToggleUserMenu] = useState(false)
  const [menuMobile, setMenuMobile] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const handleLogout = () => {
    dispatch(logoutUser())
    setToggleUserMenu((prev) => !prev)
  }

  const handleSearch = () => {
    navigate('/products', { state: { search: searchValue } })
    setSearchValue('')
  }

  return (
    <header className='fixed top-0 z-50 w-full bg-white'>
      <section className='flex h-[40px] items-center gap-x-1 bg-black px-1 text-white'>
        <p className='min-w-[250px] flex-1 overflow-hidden overflow-ellipsis whitespace-nowrap text-center capitalize'>
          new shop open and free express delivery - <span className='uppercase'>off 50%</span>{' '}
          <Link className='underline'>ShopNow</Link>
        </p>
        <div className='group relative py-1 hover:cursor-pointer'>
          <p>
            English <FontAwesomeIcon icon={faChevronDown} />
          </p>
          <div className='absolute right-0 top-full hidden min-w-[120px] select-none rounded bg-stone-500 group-hover:block'>
            {languages.map((language) => (
              <li className='block px-4 py-1 hover:bg-neutral-400' key={language.type}>
                {language.inUsed && <FontAwesomeIcon icon={faCheck} className='mr-2' />}
                <span>{language.name}</span>
              </li>
            ))}
          </div>
        </div>
      </section>
      <Container>
        <nav className='mt-6 flex h-[75px] items-center justify-between gap-x-5 bg-white'>
          <h1 className='hidden basis-[1/8] text-2xl font-medium md:block'>Exclusive</h1>
          <div className='flex w-full basis-[3/8] select-none justify-center gap-x-5 text-lg hover:cursor-pointer'>
            <Link
              to={'/'}
              className='border-b-[1px] border-transparent text-neutral-500 hover:border-neutral-400 hover:text-black'
            >
              Home
            </Link>
            <li className='border-b-[1px] border-transparent text-neutral-500 hover:border-neutral-400 hover:text-black'>
              Contact
            </li>
            <li className='border-b-[1px] border-transparent text-neutral-500 hover:border-neutral-400 hover:text-black'>
              About
            </li>
          </div>
          <div className='hidden w-full basis-[4/8] items-center justify-end gap-x-4 md:flex'>
            <div className='relative w-[255px]'>
              <input
                type='text'
                placeholder='What are you looking for?'
                className='w-full rounded bg-neutral-100 py-2 pl-3 pr-8 text-neutral-600'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className='absolute right-3 top-[50%] -translate-y-[50%] hover:cursor-pointer'
                onClick={handleSearch}
              />
            </div>
            <Link to={'/wishlist'}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 512 512'
                className='w-[25px] hover:cursor-pointer hover:text-neutral-500'
              >
                <path d='M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z' />
              </svg>
            </Link>
            <Link to={'/cart'}>
              <FontAwesomeIcon
                icon={faCartShopping}
                className='text-[22px] hover:cursor-pointer hover:text-neutral-500'
              />
            </Link>
            {user ? (
              <div className='relative select-none'>
                <FontAwesomeIcon
                  icon={faCircleUser}
                  className='text-[25px] hover:cursor-pointer'
                  onClick={() => setToggleUserMenu((prev) => !prev)}
                />
                {toggleUserMenu && (
                  <div className='absolute right-0 top-[100%] min-w-[175px] rounded bg-neutral-400 bg-opacity-70 py-3 text-white'>
                    <li className='px-2 py-3 transition-colors duration-300 hover:cursor-pointer hover:bg-neutral-300'>
                      <FontAwesomeIcon icon={faUser} className='mr-2 text-[20px]' />
                      <span className='capitalize'>manage account</span>
                    </li>
                    <li className='px-2 py-3 transition-colors duration-300 hover:cursor-pointer hover:bg-neutral-300'>
                      <FontAwesomeIcon icon={faBagShopping} className='mr-2 text-[20px]' />
                      <span className='capitalize'>my order</span>
                    </li>
                    <li
                      className='px-2 py-3 transition-colors duration-300 hover:cursor-pointer hover:bg-neutral-300'
                      onClick={handleLogout}
                    >
                      <FontAwesomeIcon icon={faRightFromBracket} className='mr-2 text-[20px]' />
                      <span className='capitalize'>Log out</span>
                    </li>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to={'/login'}
                className='select-none rounded px-4 py-2 transition-colors duration-300 hover:cursor-pointer hover:bg-neutral-100'
              >
                Login
              </Link>
            )}
          </div>
          <div className='flex justify-end md:hidden'>
            <button className='px-2' onClick={() => setMenuMobile(true)}>
              <FontAwesomeIcon icon={faBars} className='text-neutral-500' />
            </button>
          </div>
        </nav>
      </Container>
      <Divider customClass='no-margin' />
      {menuMobile && (
        <>
          <section
            className='fixed inset-0 z-[50] h-[100vh] w-full bg-neutral-300 bg-opacity-80'
            onClick={() => setMenuMobile(false)}
          ></section>
          <section
            className='fixed right-0 top-0 z-[50] h-[100vh] w-[200px] bg-neutral-500 bg-opacity-80'
            onClick={() => setMenuMobile(false)}
          >
            <h1 className='py-2 text-center text-2xl font-medium text-white'>Exclusive</h1>
            {user && <p className='p-2 text-center text-xl text-white'>Welcome, {user.username}</p>}
            <div className='flex flex-col gap-3 text-lg text-white'>
              <Link to={'/cart'} className='p-2 transition-colors duration-300 hover:bg-neutral-200 hover:text-black'>
                Cart
              </Link>
              <Link
                to={'/wishlist'}
                className='p-2 transition-colors duration-300 hover:bg-neutral-200 hover:text-black'
              >
                Wishlist
              </Link>
              {user ? (
                <>
                  <Link className='p-2 transition-colors duration-300 hover:bg-neutral-200 hover:text-black'>
                    Manage account
                  </Link>
                  <Link className='p-2 transition-colors duration-300 hover:bg-neutral-200 hover:text-black'>
                    My Order
                  </Link>
                  <Link
                    onClick={handleLogout}
                    className='p-2 transition-colors duration-300 hover:bg-neutral-200 hover:text-black'
                  >
                    Logout
                  </Link>
                </>
              ) : (
                <Link
                  to={'/login'}
                  className='p-2 transition-colors duration-300 hover:bg-neutral-200 hover:text-black'
                >
                  Login
                </Link>
              )}
            </div>
          </section>
        </>
      )}
    </header>
  )
}
