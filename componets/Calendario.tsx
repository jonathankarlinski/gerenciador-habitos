"use client";

import { toggleHabit } from "@/app/actions";
import { useEffect, useState } from "react";
import DayCheck from "./DayCheck";
import IconeFlecha from "./IconeFlecha";

function getDaysInMonth(month: number, year: number) {
  const date = new Date(year, month, 1);
  const firstDayWeekDay = date.getDay();
  const numberOfEmptyDays = Array(firstDayWeekDay).fill(null);
  const days = [...numberOfEmptyDays];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

const currentDate = new Date();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();

const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

export default function Calendario({
  habito,
  habitStreak,
}: {
  habito: string;
  habitStreak: Record<string, boolean> | null;
}) {
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState(
    getDaysInMonth(currentMonth, currentYear)
  );

  useEffect(() => {
    setDaysInMonth(getDaysInMonth(month, year));
    setSelectedDate(new Date(year, month, 1));
  }, [month, year]);

  function setMes(valor: number) {
    if (valor > 12) {
      setMonth(1);
      setYear(year + 1);
    } else if (valor < 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(valor);
    }
  }

  function getName() {
    const monthName = `${selectedDate.toLocaleString("pt-BR", {
      month: "long",
    })}`;

    const upperCaseMonthName = monthName[0].toUpperCase() + monthName.slice(1);
    return `${upperCaseMonthName} de ${selectedDate.getFullYear()}`;
  }

  function getDay(day: Date) {
    return `${year.toString()}-${(month + 1).toString().padStart(2, "0")}-${day
      .getDate()
      .toString()
      .padStart(2, "0")}`;
  }

  return (
    <section className="w-full my-2 rounded-md bg-neutral-800 p-2">
      <div className="flex justify-between mx-2 my-4 font-sans text-neutral-300">
        <button
          className="stroke-neutral-400"
          onClick={() => setMes(month - 1)}
        >
          <IconeFlecha width={15} height={15} />
        </button>
        <span>{getName()}</span>
        <button
          onClick={() => setMes(month + 1)}
          className="stroke-neutral-400"
          style={{ transform: 'rotate(180deg)' }}
        >
          <IconeFlecha
            width={15}
            height={15}
          />
        </button>
      </div>
      <div className="grid w-full grid-cols-7 mt-2">
        {weekDays.map((day) => (
          <div key={day} className="flex flex-col items-center p-2">
            <span className="font-sans text-xs font-light text-neutral-200 text-white">
              {day}
            </span>
          </div>
        ))}
        {daysInMonth.map((day, index) => (
          <button
            key={index}
            className="flex flex-col items-center p-2 gap-2"
            onClick={() =>
              toggleHabit({
                habito,
                habitStreak,
                date: getDay(day),
                done: habitStreak ? habitStreak[getDay(day)] : true,
              })
            }
          >
            <span className="font-sans text-xs font-light text-neutral-400 text-center text-white">
              {day?.getDate()}
            </span>
            {day && (
              <DayCheck
                diasCheck={habitStreak ? habitStreak[getDay(day)] : undefined}
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
