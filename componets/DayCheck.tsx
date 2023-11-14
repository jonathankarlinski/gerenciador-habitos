import Image from "next/image";

type DiaProps = {
  diasCheck: boolean | undefined;
};

const iconeDia = (diasCheck: boolean | undefined) => {
  const iconProps = {
    incomplete: {
      icon: "/images/waiting.svg",
      alt: "waiting dia",
      size: 14,
    },
    complete: {
      icon: "/images/realized.svg",
      alt: "check dia",
      size: 24,
    },
    fail: {
      icon: "/images/notDid.svg",
      alt: "fail day",
      size: 24,
    },
  };

  if (diasCheck === true) {
    return iconProps.complete;
  } else if (diasCheck === false) {
    return iconProps.fail;
  } else {
    return iconProps.incomplete;
  }
};

export default function CheckDayIcon({ diasCheck }: DiaProps) {
  const { icon, size, alt } = iconeDia(diasCheck);

  return (
    <div>
      <Image src={icon} width={size} height={size} alt={alt} />
    </div>
  );
}
