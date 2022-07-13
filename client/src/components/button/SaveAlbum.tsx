import { HeartIcon } from "@heroicons/react/solid";
import { useState } from "react";
import {
  saveAlbumForCurrentUser,
  removeAlbumForCurrentUser,
} from "../../spotify";

type Props = {
  id: string;
  saved: boolean;
};

export default function SaveAlbum({ id, saved }: Props) {
  const [saveState, setSaveState] = useState<boolean>(saved);

  const save = async () => {
    try {
      await saveAlbumForCurrentUser(id);
      setSaveState(true);
    } catch (e) {
      console.log(e);
    }
  };

  const remove = async () => {
    try {
      await removeAlbumForCurrentUser(id);
      setSaveState(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <HeartIcon
      className={`${
        saveState ? "text-green-500" : "text-transparent stroke-white"
      } h-8 w-8 cursor-pointer mx-auto`}
      onClick={saveState ? remove : save}
    />
  );
}
