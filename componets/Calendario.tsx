"use client";

import { toggleHabit } from "@/app/actions";
import { useEffect, useState } from "react";
import DayCheck from "./DayCheck";

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
    <section>
      <div>
        <button onClick={() => setMes(month - 1)}>
          voltar
        </button>
        <span>{getName()}</span>
        <button onClick={() => setMes(month + 1)}>
          avançar
        </button>
      </div>
      <div>
        {weekDays.map((day) => (
          <div key={day}>
            <span>
              {day}
            </span>
          </div>
        ))}
        {daysInMonth.map((day, index) => (
          <div
            key={index}
            onClick={() =>
              toggleHabit({
                habito,
                habitStreak,
                date: getDay(day),
                done: habitStreak ? habitStreak[getDay(day)] : true,
              })
            }
          >
            <span>
              {day?.getDate()}
            </span>
            {day && (
              <DayCheck
                diasCheck={habitStreak ? habitStreak[getDay(day)] : undefined}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
