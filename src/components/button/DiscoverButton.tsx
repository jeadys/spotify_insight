import Link from "next/link";

type Props = {
  titleMessage: string;
  buttonMessage: string;
};

export default function DiscoverButton({ titleMessage, buttonMessage }: Props) {
  return (
    <span className="flex flex-col items-center text-white">
      <span>{titleMessage}</span>
      <Link href={`/discover`} passHref={true}>
        <a className="bg-cyan-600 text-white max-w-fit py-2 px-5 rounded-full cursor-pointer my-5 font-semibold">
          {buttonMessage}
        </a>
      </Link>
    </span>
  );
}
