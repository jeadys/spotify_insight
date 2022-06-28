import "./App.css";
import { useState, useEffect } from "react";
import { accessToken, getCurrentUserProfile } from "./spotify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import {
  Login,
  Profile,
  TopArtists,
  TopTracks,
  Playlists,
  Playlist,
} from "./pages";
import Content from "./components/Content";
import { TrackProvider } from "./components/TrackContext";

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
        <div className="min-h-screen">
          <Router>
            <Content>
              <ScrollToTop />
              <TrackProvider>
                <Routes>
                  <Route path="/" element={<Profile />}></Route>
                  <Route path="/top-artists" element={<TopArtists />} />
                  <Route path="/top-tracks" element={<TopTracks />} />
                  <Route path="/playlists" element={<Playlists />} />
                  <Route path="/playlists/:id" element={<Playlist />} />
                </Routes>
              </TrackProvider>
            </Content>
          </Router>
        </div>
      )}
    </div>
  );
};

export default App;
