import store from "@/redux/store";
export const fetchImages = async (searchQuery, pagination) => {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?page=${pagination}&per_page=20&query=${searchQuery}&client_id=NYZmd55_VTMkgRhbnDUsQvBwV2tSjfoABwwu-Zp4uJ8`
    );
    const data = await response.json();
    const result = data.results;
    console.log(result);
    return result;
  };