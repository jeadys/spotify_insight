import {
  Login,
  Profile,
  TopArtists,
  TopTracks,
  Playlists,
  Playlist,
  Artist,
  Album,
} from "./pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { accessToken, getCurrentUserProfile } from "./spotify";
import TrackProvider from "./components/TrackContext";
import { Content } from "./components";
import { useState, useEffect } from "react";
import "./App.css";

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
              <TrackProvider>
                <div className="space-y-10">
                  <Routes>
                    <Route path="/" element={<Profile />}></Route>
                    <Route path="/top-artists" element={<TopArtists />} />
                    <Route path="/top-tracks" element={<TopTracks />} />
                    <Route path="/playlists" element={<Playlists />} />
                    <Route path="/playlists/:id" element={<Playlist />} />
                    <Route path="/artists/:id" element={<Artist />} />
                    <Route path="/albums/:id" element={<Album />} />
                  </Routes>
                </div>
              </TrackProvider>
            </Content>
          </Router>
        </div>
      )}
    </div>
  );
};

export default App;
