import type { CalendarEvent, Coach } from '../data/calendarData'
import {
  PIXELS_PER_MINUTE,
  TIME_RANGE,
  formatTimeRange,
  getEventLayouts,
  getWeekDays,
} from '../utils/weekLayout'

type WeekViewProps = {
  referenceDate: Date
  coaches: Coach[]
  events: CalendarEvent[]
  visibleCoachIds: string[]
}

const formatDayLabel = (date: Date) =>
  new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date)

const formatDayDate = (date: Date) =>
  new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date)

const isSameDay = (left: Date, right: Date) =>
  left.getFullYear() === right.getFullYear() &&
  left.getMonth() === right.getMonth() &&
  left.getDate() === right.getDate()

function WeekView({ referenceDate, coaches, events, visibleCoachIds }: WeekViewProps) {
  const weekDays = getWeekDays(referenceDate)
  const visibleCoaches = coaches.filter((coach) => visibleCoachIds.includes(coach.id))
  const totalMinutes = (TIME_RANGE.endHour - TIME_RANGE.startHour) * 60
  const gridHeight = totalMinutes * PIXELS_PER_MINUTE

  return (
    <div className="week-view">
      <div className="week-view__grid">
        {weekDays.map((day) => (
          <div key={day.toISOString()} className="week-view__day">
            <div className="week-view__day-header">
              <p className="week-view__day-name">{formatDayLabel(day)}</p>
              <p className="week-view__day-date">{formatDayDate(day)}</p>
            </div>
            <div
              className="week-view__day-body"
              style={{
                gridTemplateColumns: `repeat(${Math.max(visibleCoaches.length, 1)}, minmax(140px, 1fr))`,
              }}
            >
              {visibleCoaches.map((coach) => {
                const coachEvents = events.filter((event) => {
                  if (event.coachId !== coach.id) {
                    return false
                  }
                  return isSameDay(new Date(event.start), day)
                })

                const layouts = getEventLayouts(
                  coachEvents,
                  day,
                  TIME_RANGE.startHour,
                  TIME_RANGE.endHour,
                  PIXELS_PER_MINUTE,
                )

                return (
                  <div key={coach.id} className="week-view__coach-column">
                    <div className="week-view__coach-header">{coach.displayName}</div>
                    <div className="week-view__time-grid" style={{ height: `${gridHeight}px` }}>
                      {layouts.map((layout) => (
                        <div
                          key={layout.event.id}
                          className="week-view__event"
                          style={{ top: `${layout.top}px`, height: `${layout.height}px` }}
                        >
                          <p className="week-view__event-title">{layout.event.title}</p>
                          <p className="week-view__event-time">
                            {formatTimeRange(layout.event.start, layout.event.end)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
              {visibleCoaches.length === 0 && (
                <div className="week-view__empty">No coaches selected.</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WeekView