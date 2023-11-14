"use server";

import { kv } from "@vercel/kv";
import { revalidatePath } from '@/node_modules/next/cache';
import { redirect } from '@/node_modules/next/navigation';

export async function novoHabito(formData: FormData) {

  const resultado = formData.get('habito')

  await kv.hset("habitos", { [resultado as string]: {} })

  revalidatePath('/')
  redirect('/')
}

export async function deletaHabito(habito: string) {
  await kv.hdel("habitos", habito);

  revalidatePath("/");
}

type ToggleHabitParams = {
  habito: string;
  habitStreak: Record<string, boolean> | null;
  date: string | null;
  done?: boolean;
};

export async function toggleHabit({
  habito,
  habitStreak,
  date,
  done,
}: ToggleHabitParams) {
  if (!habitStreak || !date) {
    return;
  }

  const updatedHabitStreak = {
    [habito]: {
      ...habitStreak,
      [date]: done === undefined ? true : !done,
    },
  };

  await kv.hset("habitos", updatedHabitStreak);
  revalidatePath("/");
}