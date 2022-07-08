import { getCurrentUserPlaylists } from "../spotify";
import { PlaylistGrid } from "../components/grid";
import { SectionWrapper } from "../components";
import { useState, useEffect } from "react";
import axios from "axios";
import { IUsersPlaylists } from "../common/interfaces/usersPlaylists";
import { useQuery } from "react-query";

export default function Playlists() {
  const [playlistsData, setPlaylistsData] = useState<IUsersPlaylists>();
  // const [playlists, setPlaylists] = useState<IUsersPlaylists["items"]>();

  const fetchPlaylists = async () => {
    const playlists = await getCurrentUserPlaylists();
    return playlists.data;
  };

  const {
    data: playlists,
    isLoading: playlistsIsLoading,
    error: playlistsError,
  } = useQuery<IUsersPlaylists>("playlists", fetchPlaylists);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const { data } = await getCurrentUserPlaylists();
  //       setPlaylistsData(data);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // // When playlistsData updates, check if there are more playlists to fetch
  // // then update the state variable
  // useEffect(() => {
  //   if (!playlistsData) {
  //     return;
  //   }

  //   // Playlist endpoint only returns 20 playlists at a time, so we need to
  //   // make sure we get ALL playlists by fetching the next set of playlists
  //   const fetchMoreData = async () => {
  //     try {
  //       if (playlistsData.next) {
  //         const { data } = await axios.get(playlistsData.next);
  //         setPlaylistsData(data);
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  //   // Use functional update to update playlists state variable
  //   // to avoid including playlists as a dependency for this hook
  //   // and creating an infinite loop
  //   setPlaylists((playlists) => [
  //     ...(playlists ? playlists : []),
  //     ...playlistsData.items,
  //   ]);

  //   // Fetch next set of playlists as needed
  //   fetchMoreData();
  // }, [playlistsData]);

  return (
    <>
      {playlists && (
        <>
          <SectionWrapper title="Playlists" breadcrumb="true">
            <PlaylistGrid items={playlists.items} />
          </SectionWrapper>
        </>
      )}
    </>
  );
}

// import { getCurrentUserPlaylists } from "../spotify";
// import { PlaylistGrid } from "../components/grid";
// import { SectionWrapper } from "../components";
// import { useState, useEffect } from "react";
// import { IUsersPlaylists } from "../common/interfaces/usersPlaylists";

// export default function Playlists() {
//   const [playlists, setPlaylists] = useState<IUsersPlaylists>();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const userPlaylists = await getCurrentUserPlaylists();
//         setPlaylists(userPlaylists.data);
//       } catch (e) {
//         console.error(e);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <>
//       {playlists && (
//         <>
//           <SectionWrapper title="Playlists" breadcrumb="true">
//             <PlaylistGrid items={playlists.items} />
//           </SectionWrapper>
//         </>
//       )}
//     </>
//   );
// }
