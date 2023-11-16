import Image from "next/image";

type DiaProps = {
  diasCheck: boolean | undefined;
};

const iconeDia = (diasCheck: boolean | undefined) => {
  const iconProps = {
    incomplete: {
      icon: "/images/waiting.svg",
      alt: "icon waiting dia",
      size: 14,
    },
    complete: {
      icon: "/images/realized.svg",
      alt: "icon check dia",
      size: 23,
    },
    fail: {
      icon: "/images/notDid.svg",
      alt: "icon fail day",
      size: 20,
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
    <div className="flex items-center justify-center h-9">
      <Image src={icon} width={size} height={size} alt={alt} />
    </div>
  );
}
