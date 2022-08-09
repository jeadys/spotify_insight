type Props = {
  value: string;
};

export default function BioValue({ value }: Props) {
  return <span className="md:text-2xl font-black text-blue-400">{value}</span>;
}
