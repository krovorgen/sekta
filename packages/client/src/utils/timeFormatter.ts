export const timeFormatter = (time: number) => {
  const milliseconds = Math.floor((time % 1000) / 100)
  const seconds = Math.floor((time / 1000) % 60)
  const minutes = Math.floor((time / (1000 * 60)) % 60)
  const hours = Math.floor((time / (1000 * 60 * 60)) % 24)

  const formattedHours = hours ? `${hours < 10 ? '0' + hours : hours} h ` : ''
  const formattedMinutes = minutes
    ? `${minutes < 10 ? '0' + minutes : minutes} m `
    : ''
  const formattedSeconds = seconds
    ? `${seconds < 10 ? '0' + seconds : seconds} s `
    : ''
  const formattedMilliSeconds = `${milliseconds} ms`
  // ? `${milliseconds < 10 ? '0' + milliseconds : milliseconds} ms `
  // : ''

  return (
    formattedHours + formattedMinutes + formattedSeconds + formattedMilliSeconds
  )
}
