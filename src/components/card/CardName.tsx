type Props = {
  name: string;
};

export default function CardName({ name }: Props) {
  return (
    <h3 className="text-white text-sm font-medium">
      {name.length < 20 ? <>{name}</> : <>{name.slice(0, 20).concat("...")}</>}
    </h3>
  );
}
