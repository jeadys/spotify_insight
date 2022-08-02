import axios from "axios";
import { getSession } from "next-auth/react";

export const useAxios = async ({ ...options }) => {
  const instance = axios.create({ baseURL: "https://api.spotify.com/v1" });

  const session = await getSession();
  if (session) {
    instance.defaults.headers.common.Authorization = `Bearer ${session.accessToken}`;
    instance.defaults.headers.common["Content-Type"] = "application/json";
  }

  return instance(options);
};
