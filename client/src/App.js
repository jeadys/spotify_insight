import "./App.css";
import { useState, useEffect } from "react";
import { accessToken, getCurrentUserProfile } from "./spotify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { Login, Profile, TopArtists, TopTracks, Playlists } from "./pages";
import Content from "./components/Content";

const App = () => {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setToken(accessToken);

    const fetchData = async () => {
      try {
        const { data } = await getCurrentUserProfile();
        setProfile(data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App bg-gray-900 min-h-screen font-maven">
      {!token ? (
        <Login />
      ) : (
        <div className="min-h-screen flex">
          <Router>
            {/* <div className="hidden lg:block w-72 bg-black"></div> */}
            <Content>
              <ScrollToTop />
              <Routes>
                <Route path="/top-artists" element={<TopArtists />} />
                <Route path="/top-tracks" element={<TopTracks />} />
                <Route path="/playlists" element={<Playlists />} />
                <Route path="/playlists/:id" element={<h1>Playlist</h1>} />
                <Route path="/" element={<Profile />}></Route>
              </Routes>
            </Content>
          </Router>
        </div>
      )}
    </div>
  );
};

export default App;
