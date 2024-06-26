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
    <main className="container relative flex flex-col gap-8 px-4 pt-16">
      {resultados === null && (
        <h1 className="mt-20 text-4xl font-light text-white font-display text-center">
          Você não tem hábitos cadastrados
        </h1>
      )}
      {resultados !== null &&
        Object.entries(resultados).map(([habito, habitStreak]) => (
          <div key={habito} className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-xl font-light text-white font-sans">
                {habito}
              </span>
              <DeleteButton habito={habito} />
            </div>
            <Link href={`habito/${habito}`}>
              <section className="grid grid-cols-7 bg-neutral-800 rounded-md p-2">
                {sortedWeekDays.map((day, index) => (
                  <div key={day} className="flex flex-col last:font-bold items-center gap-3">
                    <span className="font-sans text-xs text-white ">
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
        className="fixed text-center bottom-10 w-2/3 left-1/2 -translate-x-1/2 text-neutral-900 bg-[#45EDAD] font-display font-regular text-2xl p-2 rounded-md"
      >
        novo hábito
      </Link>
    </main>
  );
}