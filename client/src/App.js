import "./App.css";
import { accessToken, logout } from "./spotify";
import { useEffect, useState } from "react";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(accessToken);
  }, []);

  return (
    <div className="App">
      {!token ? (
        <a
          className="App-link"
          href="http://localhost:8888/login"
          rel="noopener noreferrer"
        >
          Log in to Spotify
        </a>
      ) : (
        <>
          <h1>Logged in!</h1>
          <button onClick={logout}>Log out</button>
        </>
      )}
    </div>
  );
}

export default App;
