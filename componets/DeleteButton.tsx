"use client";

import { deletaHabito } from "@/app/actions";

function DeleteButton({ habito }: { habito: string }) {
  return (
    <button onClick={() => deletaHabito(habito)}>
      deletar
    </button>
  );
}

export default DeleteButton;