import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'

export default function Slider({ customClass, imgsSrc }) {
  return (
    <div className={`${customClass} bg-neutral-100`}>
      <Splide aria-label='Banner' options={{ type: 'loop', autoplay: true, rewindSpeed: 1000, arrows: false }}>
        {imgsSrc.map((src, index) => (
          <SplideSlide key={index}>
            <img src={src} alt='' height='100%' className='mx-auto object-cover' />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  )
}
