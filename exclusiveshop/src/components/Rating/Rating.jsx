import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const displayRating = (rating = 0, key) => {
  const fullStar = Math.floor(rating)
  const halfStar = rating - fullStar > 0

  const display = []

  for (let i = 0; i < 5; i++) {
    if (i < fullStar) {
      display.push(<FontAwesomeIcon key={`${key}${i}`} icon={faStar} className='text-yellow-500' />)
    } else if (halfStar) {
      display.push(<FontAwesomeIcon key={`${key}${i}`} icon={faStarHalf} className='text-yellow-500' />)
    } else display.push(<FontAwesomeIcon key={`${key}${i}`} icon={faStar} className='text-gray-300' />)
  }

  return display
}

export default function Rating({ rating, id }) {
  return <>{displayRating(rating, id)}</>
}
