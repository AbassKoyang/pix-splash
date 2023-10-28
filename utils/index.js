export const fetchImages = async (image) => {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?page=2&query=${image}&client_id=NYZmd55_VTMkgRhbnDUsQvBwV2tSjfoABwwu-Zp4uJ8`
    );
    const data = await response.json();
    const result = data.results;
    console.log(result);
    return result;
  };