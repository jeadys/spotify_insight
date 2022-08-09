import { HeartIcon } from "@heroicons/react/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

import { removeTrackForCurrentUser, saveTrackForCurrentUser } from "../../lib/spotify";

type Props = {
  id: string;
  saved: boolean;
};

export default function SaveTrackButton({ id, saved }: Props) {
  const [saveState, setSaveState] = useState<boolean>(saved);
  const queryClient = useQueryClient();
  const { asPath } = useRouter();

  const { mutateAsync: saveTrack } = useMutation(saveTrackForCurrentUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["saved-tracks"]);
      queryClient.invalidateQueries(["is-track-saved", asPath]);
      setSaveState(true);
    },
  });

  const { mutateAsync: removeTrack } = useMutation(removeTrackForCurrentUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["saved-tracks"]);
      queryClient.invalidateQueries(["is-track-saved", asPath]);
      setSaveState(false);
    },
  });

  const save = async () => await saveTrack(id);

  const remove = async () => await removeTrack(id);

  return (
    <HeartIcon
      className={`${
        saveState ? "text-green-500" : "text-transparent stroke-white"
      } h-6 w-6 cursor-pointer`}
      onClick={saveState ? remove : save}
    />
  );
}
