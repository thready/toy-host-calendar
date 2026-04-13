export type Coach = {
  id: string
  displayName: string
}

export type CalendarEvent = {
  id: string
  start: string
  end: string
  coachId: string
  title: string
}

export const coaches: Coach[] = [
  { id: 'coach-luna', displayName: 'Coach Luna' },
  { id: 'coach-rocket', displayName: 'Coach Rocket' },
  { id: 'coach-sunny', displayName: 'Coach Sunny' },
]

export const events: CalendarEvent[] = [
  {
    id: 'event-1',
    title: 'Welcome session',
    coachId: 'coach-luna',
    start: '2026-01-19T09:00:00',
    end: '2026-01-19T10:30:00',
  },
  {
    id: 'event-2',
    title: 'Toy handoff',
    coachId: 'coach-rocket',
    start: '2026-01-19T11:00:00',
    end: '2026-01-19T12:00:00',
  },
  {
    id: 'event-3',
    title: 'Storytime prep',
    coachId: 'coach-sunny',
    start: '2026-01-20T13:00:00',
    end: '2026-01-20T14:30:00',
  },
  {
    id: 'event-4',
    title: 'Midweek check-in',
    coachId: 'coach-luna',
    start: '2026-01-21T10:00:00',
    end: '2026-01-21T11:00:00',
  },
  {
    id: 'event-5',
    title: 'Kit review',
    coachId: 'coach-rocket',
    start: '2026-01-22T15:00:00',
    end: '2026-01-22T16:15:00',
  },
  {
    id: 'event-6',
    title: 'Photo update',
    coachId: 'coach-sunny',
    start: '2026-01-23T09:30:00',
    end: '2026-01-23T10:15:00',
  },
  {
    id: 'event-7',
    title: 'Pickup briefing',
    coachId: 'coach-luna',
    start: '2026-01-24T14:00:00',
    end: '2026-01-24T15:30:00',
  },
]