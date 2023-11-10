import Image from '@/node_modules/next/image';
import HabitoCard from '@/componets/habitoCard';
import Link from '@/node_modules/next/link';
import { kv } from '@/node_modules/@vercel/kv/dist/index.cjs';

export default async function Home() {
  const resultados = await kv.hgetall('habitos');
  console.log('aaaaaaaaaaaaaaaaaaa', resultados);

  return (
    <main>
      {
        resultados === null || resultados.length === 0 ? (
          <h1>
            você não tem hábitos cadastrados
          </h1>
        ) : Object.entries(resultados).map((resultado, index) => (
          <HabitoCard key={index} info={resultado} />
        ))
      }
      <Link href='cadastrar-habito'>
        novo hábito
      </Link>
    </main>
  )
}
