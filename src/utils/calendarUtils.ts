export type CalendarCell = {
  date: Date
  inMonth: boolean
}

export const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const buildCalendar = (year: number, monthIndex: number): CalendarCell[] => {
  const firstOfMonth = new Date(year, monthIndex, 1)
  const lastOfMonth = new Date(year, monthIndex + 1, 0)
  const startOffset = firstOfMonth.getDay()
  const totalCells = 42
  const cells: CalendarCell[] = []

  for (let i = 0; i < totalCells; i += 1) {
    const dayNumber = i - startOffset + 1
    const date = new Date(year, monthIndex, dayNumber)
    const inMonth = dayNumber >= 1 && dayNumber <= lastOfMonth.getDate()
    cells.push({ date, inMonth })
  }

  return cells
}