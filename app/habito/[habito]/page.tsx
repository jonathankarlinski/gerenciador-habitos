import Image from '@/node_modules/next/image';
import Link from '@/node_modules/next/link';
import { kv } from '@/node_modules/@vercel/kv/dist/index.cjs';

export default async function Habito({ params: { habito } }: { params: { habito: string } }) {
  const teste = decodeURI(habito)
  const teste2 = await kv.hget("habitos", teste)
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

  function obterDiasDoMes(ano: number, mes: number) {
    const primeiroDiaDoMes = new Date(ano, mes, 1);
    const diasNoMes = new Date(ano, mes + 1, 0).getDate();
    const dias = [];

    const diaDaSemana = primeiroDiaDoMes.getDay();
    for (let i = 0; i < diaDaSemana; i++) {
      dias.push(null);
    }

    for (let dia = 1; dia <= diasNoMes; dia++) {
      dias.push(new Date(ano, mes, dia));
    }

    return dias;
  }

  const dataAtual = new Date();
  const diaAtual = dataAtual.getDay();
  const mesAtual = dataAtual.getMonth();
  const anoAtual = dataAtual.getFullYear();

  const diaNoMes = obterDiasDoMes(anoAtual, mesAtual)

  return (
    <main>
      <h1>{teste}</h1>
      <Link href='/'>voltar</Link>
      <section>
        <div>
          <button>ir</button>
          <span>Julho de 2023</span>
          <button>voltar</button>
        </div>
        <div>
          {weekDays.map((day) => (
            <div key={day} >
              <span>{day}</span>
            </div>
          ))}
          {diaNoMes.map((day, index) => (
            <div key={index}>
              <span>{day?.getDate()}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
