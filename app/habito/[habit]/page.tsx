import Calendario from "@/componets/Calendario";
import { kv } from "@vercel/kv";
import Link from "next/link";

export default async function Habito({ params: { habit } }: { params: { habit: string } }) {
  const decodedHabit = decodeURI(habit);
  const habitStreak: Record<string, boolean> | null = await kv.hget(
    "habitos",
    decodedHabit
  );

  return (
    <main>
      <h1>
        {decodedHabit}
      </h1>

      <Link
        href="/"
      >
        Voltar
      </Link>
      <Calendario habito={decodedHabit} habitStreak={habitStreak} />
    </main>
  );
}
