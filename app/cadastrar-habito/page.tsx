import { novoHabito } from "../actions";

export default function NovoHabito() {
  return (
    <main>
      <h1>
        novo hábito
      </h1>
      <form action={novoHabito}>
        <input
          type="text"
          name="habito"
          id="habito"
        />
        <button
          type="submit"
        >
          cadastrar
        </button>
        <button>
          cancelar
        </button>
      </form>
    </main>
  );
}
