import Image from '@/node_modules/next/image';
import HabitoCard from '@/componets/habitoCard';
import Link from '@/node_modules/next/link';

export default function Home() {
  const testes = [
    {
      habito: 'beber agua',
      dias: [
        {
          dia: '2023-07-18',
          validate: true,
        },
        {
          dia: '2023-07-19',
          validate: true,
        }, {
          dia: '2023-07-20',
          validate: true,
        }, {
          dia: '2023-07-21',
          validate: true,
        },

      ]
    },
    {
      habito: 'codar',
      dias: [
        {
          dia: '2023-07-18',
          validate: true,
        },
        {
          dia: '2023-07-19',
          validate: true,
        }, {
          dia: '2023-07-20',
          validate: true,
        }, {
          dia: '2023-07-21',
          validate: true,
        },

      ]
    }
  ]

  return (
    <main>
      {
        testes === null || testes.length === 0 && (
          <h1>
            você não tem hábitos cadastrados
          </h1>
        )}

      {
        testes !== null && testes.map((teste) => (
          <HabitoCard key={teste.habito} info={teste} />
        ))
      }
      <Link href='cadastrar-habito'>
        novo hábito
      </Link>
    </main>
  )
}
