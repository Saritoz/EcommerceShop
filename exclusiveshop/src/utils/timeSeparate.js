// calculate time remaining in milisecond
export const timeRemaining = (days) => {
  const currentDate = new Date()
  const nextDate = new Date(currentDate)
  nextDate.setDate(currentDate.getDate() + days)
  nextDate.setHours(0, 0, 0, 0)
  return Math.round((nextDate.getTime() - currentDate.getTime()) / 1000)
}

// separate remaining time to days, hours, minutes, seconds
export const timeSeparate = (time) => {
  return [
    {
      name: 'days',
      value: Math.floor(time / 86400)
    },
    {
      name: 'hours',
      value: Math.floor((time % 86400) / 3600)
    },
    {
      name: 'minutes',
      value: Math.floor((time % 3600) / 60)
    },
    {
      name: 'seconds',
      value: Math.floor(time % 60)
    }
  ]
}
