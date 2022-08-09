type Props = {
  image: string;
  alt: string;
  rounded?: boolean;
};

export default function CardImage({ image, alt, rounded }: Props) {
  console.log(alt);
  return (
    <img
      src={image}
      className={`object-cover mb-5 ${rounded ? "w-32 h-32 rounded-full" : "w-48 h-48 rounded-md"}`}
      alt={alt}
    />
  );
}
