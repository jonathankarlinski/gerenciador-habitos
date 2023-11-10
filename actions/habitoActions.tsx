import { revalidatePath } from '@/node_modules/next/cache';
import { redirect } from '@/node_modules/next/navigation';
import { kv } from "@vercel/kv";

export async function novoHabito(formData: FormData) {
  "use server"

  const resultado = formData.get('habito')

  await kv.hset("habitos", { [resultado as string]: {} })

  revalidatePath('/')
  redirect('/')
}