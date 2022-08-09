type Props = {
  info: string;
};

export default function CardInfo({ info }: Props) {
  return (
    <span className="text-xs text-gray-300">
      {info.length < 20 ? info : info.slice(0, 20).concat("...")}
    </span>
  );
}
