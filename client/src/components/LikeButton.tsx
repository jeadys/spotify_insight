import React, { useEffect, useState } from "react";
import {
  getDoesUserHaveTrackSaved,
  saveTrackForCurrentUser,
  removeTrackForCurrentUser,
} from "../spotify";
import { HeartIcon } from "@heroicons/react/solid";

type Props = {
  id: string;
};

export default function LikeButton({ id }: Props) {
  const [isSaved, setIsSaved] = useState<boolean>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const isTrackSaved = await getDoesUserHaveTrackSaved(id);
        setIsSaved(isTrackSaved.data[0]);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [id]);

  const save = async () => {
    try {
      await saveTrackForCurrentUser(id);
      setIsSaved(true);
    } catch (e) {
      console.log(e);
    }
  };

  const remove = async () => {
    try {
      await removeTrackForCurrentUser(id);
      setIsSaved(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <HeartIcon
      className={`${
        isSaved ? "text-green-500" : "text-gray-500"
      } h-5 w-5 cursor-pointer`}
      onClick={isSaved ? remove : save}
    />
  );
}
