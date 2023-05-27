import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Container from '../Container/Container'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className='bg-black text-white'>
      <Container customClass='flex justify-between gap-y-10 py-5 flex-wrap md:flex-nowrap'>
        <div className='flex basis-full flex-col gap-y-3 sm:basis-1/5'>
          <h3 className='mb-2 text-lg font-semibold'>Exclusive</h3>
          <h4>Subscribe</h4>
          <p>Get 10% off your first order</p>
          <div className='relative w-[200px]'>
            <input
              type='text'
              placeholder='Enter your email'
              className='w-full rounded border-[1px] border-neutral-300 bg-transparent py-1 pl-2 pr-8'
            />
            <FontAwesomeIcon
              icon={faPaperPlane}
              className='absolute right-2 top-[50%] -translate-y-[50%] hover:cursor-pointer'
            />
          </div>
        </div>
        <div className='flex basis-full flex-col gap-y-3 sm:basis-1/5'>
          <h3 className='mb-2 text-lg font-semibold'>Support</h3>
          <p>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
          <p>exclusive@gmail.com</p>
          <p>+88015-88888-9999</p>
        </div>
        <div className='flex basis-full flex-col gap-y-3 sm:basis-1/5'>
          <h3 className='mb-2 text-lg font-semibold'>Account</h3>
          <li>My Account</li>
          <li>Login/Register</li>
          <li>Cart</li>
          <li>Wishlist</li>
          <li>Shop</li>
        </div>
        <div className='flex basis-full flex-col gap-y-3 sm:basis-1/5'>
          <h3 className='mb-2 text-lg font-semibold'>Quick Link</h3>
          <li>
            <Link to={''}>Privacy Policy</Link>
          </li>
          <li>
            <Link to={''}>Term Of Use</Link>
          </li>
          <li>
            <Link to={''}>FAQ</Link>
          </li>
          <li>
            <Link to={''}>Contact</Link>
          </li>
        </div>
        <div className='flex basis-full flex-col gap-y-3 sm:basis-1/5'>
          <h3 className='mb-2 text-lg font-semibold'>Download App</h3>
          <p>Save $3 with App New User Only</p>
          <div className='flex justify-between'>
            <img src='/assets/imgs/Qrcodeapp.png' alt='QR code' className='w-[100px]' />
            <div className='flex flex-col gap-y-4'>
              <img src='/assets/imgs/AppStoreDownload.png' alt='' className='w-[110px]' />
              <img src='/assets/imgs/GooglePlayDownload.png' alt='' className='w-[110px]' />
            </div>
          </div>
        </div>
      </Container>
      <div className='pb-4 text-center text-neutral-500'>
        <p>&copy; Copyright Rimel 2022. All right reserved</p>
        <p>App clone by Sarito</p>
      </div>
    </footer>
  )
}
