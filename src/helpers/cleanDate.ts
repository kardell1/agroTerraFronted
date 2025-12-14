const cleanDate = (dateString: Date) => {
  const date = new Date(dateString)

  // Hora con segundos
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  const time = `${hours}:${minutes}:${seconds}`

  // Fecha
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  const formattedDate = `${day}/${month}/${year}`

  return `${time} - ${formattedDate}`
}

export default cleanDate
