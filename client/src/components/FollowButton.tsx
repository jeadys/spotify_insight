import React, { useEffect, useState } from "react";
import {
  getDoesUserFollowArtist,
  followArtist,
  unfollowArtist,
} from "../spotify";
import { HeartIcon } from "@heroicons/react/solid";

type Props = {
  id: string;
};

export default function FollowButton({ id }: Props) {
  const [isFollowed, setIsFollowed] = useState<boolean>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const isArtistFollowed = await getDoesUserFollowArtist(id);
        setIsFollowed(isArtistFollowed.data[0]);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [id]);

  const follow = async () => {
    try {
      await followArtist(id);
      setIsFollowed(true);
    } catch (e) {
      console.log(e);
    }
  };

  const unfollow = async () => {
    try {
      await unfollowArtist(id);
      setIsFollowed(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <HeartIcon
      className={`${
        isFollowed ? "text-green-500" : "text-gray-500"
      } h-5 w-5 cursor-pointer flex`}
      onClick={isFollowed ? unfollow : follow}
    />
  );
}
