import { useEffect, useState } from 'react'
import { timeSeparate, timeRemaining } from '../../utils/timeSeparate'
import DisplayTime from './DisplayTime'

export default function Countdown({ days }) {
  const [remaining, setRemaining] = useState(timeRemaining(days))
  const separate = timeSeparate(remaining)

  useEffect(() => {
    const countdown = setInterval(() => {
      setRemaining((prev) => (prev > 0 ? prev - 1 : prev))
    }, 1000)
    return () => clearInterval(countdown)
  }, [])
  return (
    <section className='flex gap-x-5'>
      {separate.map((item) => (
        <DisplayTime key={item.name} content={item.name} value={item.value} />
      ))}
    </section>
  )
}
