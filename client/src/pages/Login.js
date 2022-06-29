export default function Login() {
  const LOGIN_URI =
    process.env.NODE_ENV !== "production"
      ? "http://localhost:8888/login"
      : "https://spotify-insight-v1.herokuapp.com/login";

  return (
    <div className="flex justify-center items-center h-screen">
      <a
        className="p-5 text-white bg-green-600 hover:bg-green-700 transition ease-in-out rounded-full"
        href={LOGIN_URI}
        rel="noopener noreferrer"
      >
        Connect Spotify
      </a>
    </div>
  );
}
