export const isNewItem = (date) => {
  const createdItemDate = new Date(date)
  const last10days = new Date()
  last10days.setDate(last10days.getDate() - 10)
  return last10days <= createdItemDate
}
