import React from "react";

/**
 * Format milliseconds to time duration
 * @param {number} ms number of milliseconds
 * @returns {string} formatted duration string
 * @example 216699 -> '3:36'
 */
export const formatDuration = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

/**
 * Prevents further propagation of the current event in the capturing and bubbling phases
 */
export const stopProp = (e: React.MouseEvent<HTMLElement>) => {
  e.stopPropagation();
};

// Get year from YYYY-MM-DD
export const getYear = (date: string) => date.split("-")[0];
