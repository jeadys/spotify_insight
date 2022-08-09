type Props = {
  title: string;
};

export default function BioTitle({ title }: Props) {
  return <span className="md:text-lg font-semibold text-white block">{title}</span>;
}
