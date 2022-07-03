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
import { Content, ScrollTop, Search } from "./components";
import TrackProvider from "./components/TrackContext";
import { accessToken } from "./spotify";
import "./App.css";

const App = () => {
  return (
    <div className="App bg-gray-900 min-h-screen font-maven">
      {!accessToken ? (
        <Login />
      ) : (
        <div className="min-h-screen">
          <Router>
            <Content>
              <ScrollTop />
              <TrackProvider>
                <Search />
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
