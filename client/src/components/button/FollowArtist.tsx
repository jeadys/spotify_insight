import React, { useEffect, useState } from "react";
import {
  getDoesUserFollowArtist,
  followArtist,
  unfollowArtist,
} from "../../spotify";
import { HeartIcon } from "@heroicons/react/solid";
import { useQuery } from "react-query";

type Props = {
  id: string;
  followed: boolean;
};

export default function FollowArtist({ id, followed }: Props) {
  // const [effect, setEffect] = useState<boolean>(false);
  const [followState, setFollowState] = useState<boolean>(followed);

  const follow = async () => {
    try {
      await followArtist(id);
      setFollowState(true);
    } catch (e) {
      console.log(e);
    }
  };

  const unfollow = async () => {
    try {
      await unfollowArtist(id);
      setFollowState(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <span
      className={`${
        followState ? "bg-green-500 border-transparent" : "border-white"
      } mx-auto block cursor-pointer text-white py-2 px-5 max-w-max border-2 rounded-md`}
      onClick={followState ? unfollow : follow}
    >
      {followState ? "Following" : "Follow"}
    </span>
  );
}
