import Image from '@/node_modules/next/image';
import Link from '@/node_modules/next/link';
import PropTypes from 'prop-types';

interface HabitoInfo {
  habito: string;
  dias: {
    dia: string;
    validate: boolean;
  }[];
}

export default function HabitoCard({ info }: { info: HabitoInfo }) {

  const { habito, dias } = info;


  const today = new Date();
  const todayWeeDay = today.getDay();
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

  const teste = weekDays.slice(todayWeeDay + 1).concat(weekDays.slice(0, todayWeeDay + 1));

  const aa = weekDays.map((_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - index);
    return date.toISOString().slice(0, 10)
  }).reverse();


  const testes = (valor: string | boolean) => {
    let oi = 'waiting'
    if (valor === true) {
      oi = 'realized';
    } else if (valor === false) {
      oi = 'notDid';
    } else {
      oi = 'waiting';
    }
    return oi;
  }

  return (
    <main>
      <div>
        <div>
          <span>{habito}</span>
          <button>deletar</button>
        </div>
        <Link
          href={`habito/${habito}?habito=${info}`}>
          {
            teste.map((day, index) => (
              <div key={day}>
                <span>
                  {day}
                </span>
                <Image
                  src={`/images/${testes(day)}.svg`}
                  alt='oi'
                  width={20}
                  height={20}
                />
              </div>
            ))
          }
        </Link>
      </div>
    </main >
  )
}

HabitoCard.propTypes = {
  info: PropTypes.shape({
    habito: PropTypes.string.isRequired,
    dias: PropTypes.arrayOf(
      PropTypes.shape({
        dia: PropTypes.string.isRequired,
        validate: PropTypes.bool.isRequired,
      })
    ).isRequired,
  }).isRequired,
};