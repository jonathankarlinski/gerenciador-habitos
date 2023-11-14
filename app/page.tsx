import DayCheck from "@/componets/DayCheck";
import DeleteButton from "@/componets/DeleteButton";
import { kv } from "@vercel/kv";
import Link from "next/link";

export type Habits = {
  [habit: string]: Record<string, boolean>;
} | null;

export default async function Home() {
  const resultados: Habits = await kv.hgetall('habitos');

  const today = new Date();
  const todayWeekDay = today.getDay();
  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

  const sortedWeekDays = weekDays
    .slice(todayWeekDay + 1)
    .concat(weekDays.slice(0, todayWeekDay + 1));

  const orderDay = weekDays
    .map((_, index) => {
      const date = new Date();
      date.setDate(date.getDate() - index);

      return date.toISOString().slice(0, 10);
    })
    .reverse();

  return (
    <main>
      {resultados === null ||
        (Object.keys(resultados).length === 0 && (
          <h1>
            Você não tem hábitos cadastrados
          </h1>
        ))}
      {resultados !== null &&
        Object.entries(resultados).map(([habito, habitStreak]) => (
          <div key={habito} >
            <div >
              <span >
                {habito}
              </span>
              <DeleteButton habito={habito} />
            </div>
            <Link href={`habito/${habito}`}>
              <section >
                {sortedWeekDays.map((day, index) => (
                  <div key={day} >
                    <span >
                      {day}
                    </span>
                    <DayCheck diasCheck={habitStreak[orderDay[index]]} />
                  </div>
                ))}
              </section>
            </Link>
          </div>
        ))}

      <Link
        href='cadastrar-habito'
      >
        novo hábito
      </Link>
    </main>
  );
}