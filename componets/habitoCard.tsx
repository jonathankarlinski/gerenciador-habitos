import Image from '@/node_modules/next/image';
import Link from 'next/link';

export default function HabitoCard({ info }) {
  console.log('aaaaaaaaaaaaaaaaa', info);

  const { habito, dias } = info
  return (
    <main>
      <div>
        <div>
          <span>{habito}</span>
          <button>deletar</button>
        </div>
        {
          dias.map((item, index) => (
            <div key={index}>
              <p>Dia: {item.dia}</p>
              <p>Validate: {item.validate ? 'Verdadeiro' : 'Falso'}</p>
            </div>
          ))
        }
      </div>
    </main>
  )
}
