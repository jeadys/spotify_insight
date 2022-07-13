import { HeartIcon } from "@heroicons/react/solid";
import { useState } from "react";
import {
  saveTrackForCurrentUser,
  removeTrackForCurrentUser,
} from "../../spotify";

type Props = {
  id: string;
  saved: boolean;
};

export default function SaveTrack({ id, saved }: Props) {
  const [saveState, setSaveState] = useState<boolean>(saved);

  const save = async () => {
    try {
      await saveTrackForCurrentUser(id);
      setSaveState(true);
    } catch (e) {
      console.log(e);
    }
  };

  const remove = async () => {
    try {
      await removeTrackForCurrentUser(id);
      setSaveState(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <HeartIcon
      className={`${
        saveState ? "text-green-500" : "text-transparent stroke-white"
      } h-6 w-6 cursor-pointer mx-auto`}
      onClick={saveState ? remove : save}
    />
  );
}
