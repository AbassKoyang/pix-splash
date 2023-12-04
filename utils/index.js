import store from "@/redux/store";
import { Toaster, toast } from "react-hot-toast";
export const fetchImages = async (searchQuery, page) => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?page=${page}&per_page=20&query=${searchQuery}&client_id=NYZmd55_VTMkgRhbnDUsQvBwV2tSjfoABwwu-Zp4uJ8`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch images (status: ${response.status})`);
    }

    const data = await response.json();
    const result = data.results;
    return result;
  } catch (error) {
    console.error("Error in fetchImages:", error.message);
    // Handle errors gracefully, e.g., display a user-friendly error message
    toast.error("Failed to fetch images. Please try again later.");
  }
};

export const fetchImageStats = async (id) => {
  try {
    const response = await fetch(`https://api.unsplash.com/photos/${id}/statistics?client_id=NYZmd55_VTMkgRhbnDUsQvBwV2tSjfoABwwu-Zp4uJ8`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching image stats:', error);
  }
};

export const fetchUnsplashUserProfile = async (username) => {
  try {
    const response = await fetch(`https://api.unsplash.com/users/${username}?client_id=NYZmd55_VTMkgRhbnDUsQvBwV2tSjfoABwwu-Zp4uJ8`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error('Error fetching unsplash user profile:', error);
  }
};