import {
  Login,
  Profile,
  TopArtists,
  TopTracks,
  Playlists,
  Playlist,
  Artist,
  RelatedArtists,
  Album,
  Library,
  SavedTracks,
  SavedAlbums,
  FollowedArtists,
  Discover,
  NewReleases,
  Categories,
  Category,
  FeaturedPlaylists,
  Albums,
} from "./pages/library";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Content, Navigation, ScrollTop } from "./components";
import TrackProvider from "./components/TrackContext";
import { accessToken } from "./spotify";
import "./App.css";
import Recommendations from "./pages/Recommendations";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App bg-gray-900 min-h-screen font-maven">
        {!accessToken ? (
          <Login />
        ) : (
          <div className="min-h-screen">
            <Router>
              <Content>
                <ScrollTop />
                <TrackProvider>
                  <Navigation />
                  <div className="space-y-10">
                    <Routes>
                      <Route path="/" element={<Profile />}></Route>
                      <Route path="/top-artists" element={<TopArtists />} />
                      <Route path="/top-tracks" element={<TopTracks />} />
                      <Route
                        path="/library/saved-playlists"
                        element={<Playlists />}
                      />
                      <Route path="/playlists/:id" element={<Playlist />} />
                      <Route path="/artists/:id" element={<Artist />} />
                      <Route
                        path="/artists/:id/related"
                        element={<RelatedArtists />}
                      />
                      <Route path="/artists/:id/albums" element={<Albums />} />
                      <Route path="/albums/:id" element={<Album />} />
                      <Route path="/library" element={<Library />} />
                      <Route
                        path="/library/saved-tracks"
                        element={<SavedTracks />}
                      />
                      <Route
                        path="/library/saved-albums"
                        element={<SavedAlbums />}
                      />
                      <Route
                        path="/library/followed-artists"
                        element={<FollowedArtists />}
                      />
                      <Route path="/discover" element={<Discover />} />
                      <Route
                        path="/discover/new-releases"
                        element={<NewReleases />}
                      />
                      <Route
                        path="/discover/featured-playlists"
                        element={<FeaturedPlaylists />}
                      />
                      <Route
                        path="/discover/categories"
                        element={<Categories />}
                      />
                      <Route path="/categories/:id" element={<Category />} />
                      <Route
                        path="/recommendations/:id"
                        element={<Recommendations />}
                      />
                    </Routes>
                  </div>
                </TrackProvider>
              </Content>
            </Router>
          </div>
        )}
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
