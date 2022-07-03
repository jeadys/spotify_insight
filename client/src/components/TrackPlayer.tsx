import SpotifyPlayer from "react-spotify-web-playback";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type ChooseTrackProps = {
  setPlayingTrack: React.Dispatch<React.SetStateAction<string>>;
};

type Props = {
  token: string | undefined;
  trackUri: string | undefined;
};

export default function TrackPlayer({ token, trackUri }: Props) {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    setPlay(true);
  }, [trackUri]);

  if (!token) return null;
  return createPortal(
    <SpotifyPlayer
      showSaveIcon
      magnifySliderOnHover={true}
      callback={(state) => {
        if (!state.isPlaying) setPlay(false);
      }}
      play={play}
      token={token}
      uris={trackUri ? [trackUri] : []}
      styles={{
        activeColor: "#fff",
        bgColor: "#333",
        color: "#fff",
        loaderColor: "#fff",
        sliderColor: "#7f8dee",
        trackArtistColor: "#ccc",
        trackNameColor: "#fff",
      }}
    />,
    document.getElementById("trackplayer") as Element | DocumentFragment
  );
}