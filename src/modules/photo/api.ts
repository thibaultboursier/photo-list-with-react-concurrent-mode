import { Photo } from "./types";

export const fetchPhotos = async (): Promise<Photo[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/photos");

  return await response.json();
};
