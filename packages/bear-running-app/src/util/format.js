export const formatLength = x => {
  const a = x / 1000
  const d = ((a % 1) * 10).toString().slice(0, 1)
  return `${0 | a}.${d}`
}

export const formatDate = x => {
  const d = new Date(x)

  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
}

export const formatDuration = x => {
  const hour = Math.floor(x / (60 * 60 * 1000))
  const min = Math.floor((x / (60 * 1000)) % 60)

  let m = '' + min
  while (m.length < 2) m = '0' + m

  return `${hour}h${m}`
}
