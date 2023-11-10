import { novoHabito } from "@/actions/habitoActions";
import Link from "@/node_modules/next/link";

export default function CadastrarHabito() {

  return (
    <main>
      <h1>novo hábito</h1>
      <form action={novoHabito}>
        <input
          type='text'
          name='habito'
        />
        <button
          type='submit'
        >
          cadastrar
        </button>
        <Link href='/'>
        cancelar
      </Link>
      </form>
    </main>
  )
}