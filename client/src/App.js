import "./App.css";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const accessToken = urlParams.get("access_token");
    const refreshToken = urlParams.get("refresh_token");
  }, []);

  return (
    <div className="App">
      <a
        className="App-link"
        href="http://localhost:8888/login"
        rel="noopener noreferrer"
      >
        Log in to Spotify
      </a>
    </div>
  );
}

export default App;
