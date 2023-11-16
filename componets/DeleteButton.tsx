"use client";

import { deletaHabito } from "@/app/actions";
import Image from "@/node_modules/next/image";

function DeleteButton({ habito }: { habito: string }) {
  return (
    <button onClick={() => deletaHabito(habito)}>
      <Image
        src="/images/delete.svg"
        width={20}
        height={20}
        alt="Ícone de lixeira vermelha"
      />
    </button>
  );
}

export default DeleteButton;