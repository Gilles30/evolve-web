import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { api } from '../../lib/axios'
import { generateDays } from '../../utils/generate-dates-from-years-beginning'
import { HabitDay } from '../HabitDay'

type Summary = {
  id: string
  date: string
  amount: number
  completed: number
}[]

export const SummaryTable = () => {
  const [summary, setSummary] = useState<Summary>([])

  useEffect(() => {
    api.get('summary').then((response) => {
      setSummary(response.data)
    })
  }, [])

  const weekDay = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

  const summaryDates = generateDays()
  const minSummaryDatesSize = 18 * 7
  const amountOfDaysToFill = minSummaryDatesSize - summaryDates.length

  return (
    <div className={'w-full flex'}>
      <div className={'grid grid-rows-7 grid-flow-row gap-3'}>
        {weekDay.map((weekDay, i) => {
          return (
            <div
              key={`${weekDay}-${i}`}
              className={
                'text-zinc-400 text-xl h-10 w-10 flex items-center justify-center font-bold'
              }
            >
              {weekDay}
            </div>
          )
        })}
      </div>
      <div className={'grid grid-rows-7 grid-flow-col gap-3'}>
        {summaryDates.map((date) => {
          const dayInSummary = summary.find((day) => {
            return dayjs(date).isSame(day.date, 'day')
          })
          return (
            <HabitDay
              key={date.toString()}
              date={date}
              amount={dayInSummary?.amount}
              completed={dayInSummary?.completed}
            />
          )
        })}

        {amountOfDaysToFill > 0 &&
          Array.from({ length: amountOfDaysToFill }).map((_, i) => {
            return (
              <div
                key={i}
                className={
                  'bg-zinc-800 w-10 h-10 text-white rounded-lg flex items-center justify-center border-2 border-zinc-700  opacity-40 cursor-not-allowed'
                }
              ></div>
            )
          })}
      </div>
    </div>
  )
}
