export const formatTime = (date) => new Date(date).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).toLowerCase()

export const formatTime2 = (date) => new Date(date).toLocaleString('en-GB', { hour: 'numeric', minute: 'numeric', hour12: false}).toLowerCase()

export const dayMonthYear = date => `${new Date(date).toLocaleString('en-US', { month: 'long', day: 'numeric' })} ${new Date(date).getFullYear()}`

export const dayMonthYear2 = date => new Date(date).toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).replace(/\d+/, day => day + (day % 10 === 1 && day % 100 !== 11 ? 'st' : day % 10 === 2 && day % 100 !== 12 ? 'nd' : day % 10 === 3 && day % 100 !== 13 ? 'rd' : 'th'))

export const longMonthYear = date => `${new Date(date).toLocaleString('en-US', { month: 'long' })} ${new Date(date).getFullYear()}`

export const shortMonthDayYear = date => new Date(date).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

const formatter = new Intl.RelativeTimeFormat(undefined, {
  numeric: "auto",
})

const DIVISIONS = [
  // { amount: 60, name: "seconds" },
  // { amount: 60, name: "minutes" },
  // { amount: 24, name: "hours" },
  { amount: 7, name: "days" },
  { amount: 4.34524, name: "weeks" },
  { amount: 12, name: "months" },
  { amount: Number.POSITIVE_INFINITY, name: "years" },
]

export const getDateDescription = (date) => {
  const currentDate = new Date()
  const currentDay = currentDate.getDate()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const newDate = new Date(date)
  const recvDay = newDate.getDate()
  const recvMonth = newDate.getMonth()
  const recvYear = newDate.getFullYear()

  if(currentDay===recvDay && currentMonth===recvMonth && currentYear===recvYear){
    return 'Today'
  }


  let duration = (newDate - currentDate) / (1000 * 60 * 60 * 24)

  for (let i = 0; i < DIVISIONS.length; i++) {
    const division = DIVISIONS[i]
    if (Math.abs(duration) < division.amount) {
      return capitalize(formatter.format(Math.round(duration), division.name))
    }
    duration /= division.amount
  }
}




const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)