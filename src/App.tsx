import { useState } from 'react'

import './App.css'
import WeekView from './components/WeekView'
import { coaches, events } from './data/calendarData'
import { DAY_NAMES, buildCalendar } from './utils/calendarUtils'

function App() {
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month')
  const [visibleCoachIds, setVisibleCoachIds] = useState<string[]>(
    coaches.map((coach) => coach.id),
  )

  const today = new Date()
  const monthIndex = today.getMonth()
  const year = today.getFullYear()
  const monthLabel = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(today)
  const todayLabel = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(today)

  const calendar = buildCalendar(year, monthIndex)
  const bookedDays = new Set([3, 4, 12, 13, 21, 22, 28])
  const holdDays = new Set([7, 19])


  const stats = [
    { label: 'Upcoming bookings', value: '8', trend: '+2 this week' },
    { label: 'Available slots', value: '14', trend: 'Next open: Tomorrow' },
    { label: 'Prepared kits', value: '6', trend: '2 need wash' },
  ]

  const upcomingVisits = [
    {
      date: 'Jan 23',
      time: '10:00–12:00',
      host: 'Luna the Bear',
      guest: 'Mila',
      status: 'Confirm handoff',
    },
    {
      date: 'Jan 24',
      time: '14:30–16:00',
      host: 'Rocket Raccoon',
      guest: 'Theo',
      status: 'Pack welcome kit',
    },
    {
      date: 'Jan 26',
      time: '09:00–11:30',
      host: 'Sunny Bunny',
      guest: 'Ava',
      status: 'Photo update due',
    },
  ]

  return (
    <div className="app">
      <header className="app__header">
        <div>
          <p className="eyebrow">Toy Host Dashboard</p>
          <h1>Toy Host Calendar</h1>
          <p className="subtext">Keep visits, prep tasks, and handoffs in one place.</p>
        </div>
        <div className="header-actions">
          <button className="button button--primary">New booking</button>
          <button className="button button--ghost">Sync calendar</button>
        </div>
      </header>

      <section className="stats">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <p className="stat-label">{stat.label}</p>
            <p className="stat-value">{stat.value}</p>
            <p className="stat-trend">{stat.trend}</p>
          </div>
        ))}
      </section>

      <section className="main-grid">
        <div className="card calendar">
          <div className="calendar__header">
            <div>
              <p className="eyebrow">{todayLabel}</p>
              <h2>
                {monthLabel} {year}
              </h2>
            </div>
            <div className="calendar__controls">
              <div className="view-toggle">
                <button
                  className={`view-toggle__button${viewMode === 'month' ? ' view-toggle__button--active' : ''}`}
                  onClick={() => setViewMode('month')}
                  type="button"
                >
                  Month
                </button>
                <button
                  className={`view-toggle__button${viewMode === 'week' ? ' view-toggle__button--active' : ''}`}
                  onClick={() => setViewMode('week')}
                  type="button"
                >
                  Week
                </button>
              </div>
              {viewMode === 'month' && (
                <div className="legend">
                  <span className="legend__item">
                    <span className="legend__dot legend__dot--booked" /> Booked
                  </span>
                  <span className="legend__item">
                    <span className="legend__dot legend__dot--hold" /> Hold
                  </span>
                  <span className="legend__item">
                    <span className="legend__dot legend__dot--open" /> Open
                  </span>
                </div>
              )}
            </div>
          </div>
          {viewMode === 'month' ? (
            <div className="calendar__grid">
              {DAY_NAMES.map((day) => (
                <div key={day} className="calendar__day-label">
                  {day}
                </div>
              ))}
              {calendar.map((cell) => {
                const dayNumber = cell.date.getDate()
                const isToday =
                  cell.inMonth &&
                  cell.date.toDateString() === today.toDateString()
                const isBooked = cell.inMonth && bookedDays.has(dayNumber)
                const isHold = cell.inMonth && holdDays.has(dayNumber)

                return (
                  <div
                    key={cell.date.toISOString()}
                    className={`calendar__cell${cell.inMonth ? '' : ' calendar__cell--muted'}${
                      isToday ? ' calendar__cell--today' : ''
                    }${isBooked ? ' calendar__cell--booked' : ''}${
                      isHold ? ' calendar__cell--hold' : ''
                    }`}
                  >
                    <span className="calendar__date">{dayNumber}</span>
                    {isBooked && <span className="calendar__label">Visit</span>}
                    {isHold && <span className="calendar__label">Hold</span>}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="week-view__wrapper">
              <div className="coach-filter">
                <p className="coach-filter__label">Coaches</p>
                <div className="coach-filter__options">
                  {coaches.map((coach) => (
                    <label key={coach.id} className="coach-filter__option">
                      <input
                        type="checkbox"
                        checked={visibleCoachIds.includes(coach.id)}
                        onChange={() => {
                          setVisibleCoachIds((current) =>
                            current.includes(coach.id)
                              ? current.filter((id) => id !== coach.id)
                              : [...current, coach.id],
                          )
                        }}
                      />
                      <span>{coach.displayName}</span>
                    </label>
                  ))}
                </div>
              </div>
              <WeekView
                referenceDate={today}
                coaches={coaches}
                events={events}
                visibleCoachIds={visibleCoachIds}
              />
            </div>
          )}
        </div>

        <aside className="side">
          <div className="card side__section">
            <h3>Upcoming visits</h3>
            <div className="visit-list">
              {upcomingVisits.map((visit) => (
                <div key={`${visit.date}-${visit.host}`} className="visit">
                  <div>
                    <p className="visit__date">{visit.date}</p>
                    <p className="visit__time">{visit.time}</p>
                  </div>
                  <div>
                    <p className="visit__title">{visit.host}</p>
                    <p className="visit__meta">Guest: {visit.guest}</p>
                    <span className="visit__status">{visit.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card side__section">
            <h3>Prep checklist</h3>
            <ul className="checklist">
              <li>
                <span className="checklist__badge">Today</span> Wash Luna’s outfit
              </li>
              <li>
                <span className="checklist__badge checklist__badge--soon">Tomorrow</span> Charge voice recorder
              </li>
              <li>
                <span className="checklist__badge">This week</span> Print new story cards
              </li>
            </ul>
          </div>

          <div className="card side__section">
            <h3>Availability</h3>
            <div className="availability">
              <div className="availability__item">
                <p className="availability__label">Morning slots</p>
                <p className="availability__value">6 open</p>
              </div>
              <div className="availability__item">
                <p className="availability__label">Afternoon slots</p>
                <p className="availability__value">8 open</p>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </div>
  )
}

export default App
