import type { CalendarEvent } from '../data/calendarData'

export const WEEK_STARTS_ON = 1
export const TIME_RANGE = { startHour: 8, endHour: 18 }
export const PIXELS_PER_MINUTE = 1.2

export type EventLayout = {
  event: CalendarEvent
  top: number
  height: number
}

export const getWeekStart = (date: Date, weekStartsOn = WEEK_STARTS_ON) => {
  const start = new Date(date)
  start.setHours(0, 0, 0, 0)
  const day = start.getDay()
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn
  start.setDate(start.getDate() - diff)
  return start
}

export const getWeekDays = (date: Date, weekStartsOn = WEEK_STARTS_ON) => {
  const weekStart = getWeekStart(date, weekStartsOn)
  return Array.from({ length: 7 }, (_, index) => {
    const day = new Date(weekStart)
    day.setDate(weekStart.getDate() + index)
    return day
  })
}

export const getMinutesFromStart = (date: Date, startHour: number) => {
  return date.getHours() * 60 + date.getMinutes() - startHour * 60
}

export const getEventLayouts = (
  events: CalendarEvent[],
  day: Date,
  startHour: number,
  endHour: number,
  pixelsPerMinute: number,
): EventLayout[] => {
  const dayStart = new Date(day)
  dayStart.setHours(0, 0, 0, 0)
  const dayEnd = new Date(dayStart)
  dayEnd.setDate(dayEnd.getDate() + 1)

  const rangeStartMinutes = startHour * 60
  const rangeEndMinutes = endHour * 60

  return events
    .map((event) => {
      const eventStart = new Date(event.start)
      const eventEnd = new Date(event.end)
      if (eventEnd <= dayStart || eventStart >= dayEnd) {
        return null
      }

      const startMinutes = Math.max(getMinutesFromStart(eventStart, 0), rangeStartMinutes)
      const endMinutes = Math.min(getMinutesFromStart(eventEnd, 0), rangeEndMinutes)
      const top = (startMinutes - rangeStartMinutes) * pixelsPerMinute
      const height = Math.max((endMinutes - startMinutes) * pixelsPerMinute, 18)
      return { event, top, height }
    })
    .filter((layout): layout is EventLayout => layout !== null)
}

export const formatTimeRange = (start: string, end: string) => {
  const startDate = new Date(start)
  const endDate = new Date(end)
  const format = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })
  return `${format.format(startDate)}–${format.format(endDate)}`
}