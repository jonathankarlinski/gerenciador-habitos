import Calendario from "@/componets/Calendario";
import IconeFlecha from "@/componets/IconeFlecha";
import { kv } from "@vercel/kv";
import Link from "next/link";

export default async function Habito({ params: { habit } }: { params: { habit: string } }) {
  const decodedHabit = decodeURI(habit);
  const habitStreak: Record<string, boolean> | null = await kv.hget(
    "habitos",
    decodedHabit
  );

  return (
    <main className="container relative flex flex-col gap-8 px-12 pt-16">
      <h1 className="text-2xl font-light text-center text-white font-display">
        {decodedHabit}
      </h1>
      <Link
        className="flex  items-center font-sans text-xs text-neutral-300 gap-2 "
        href="/"
      >
        <IconeFlecha width={12} height={12} />
        Voltar
      </Link>
      <Calendario habito={decodedHabit} habitStreak={habitStreak} />
    </main>
  );
}
