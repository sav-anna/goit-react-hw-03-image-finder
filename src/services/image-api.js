import axios from 'axios';

const fetchImages = async ({ searchImages = '', page = 1 }) => {
  const API_KEY = '34447533-02da5e46794bf671aeaafda8d';
  const URL = `https://pixabay.com/api/?q=${searchImages}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  return await axios.get(URL).then(response =>
    response.data.hits.map(({ id, tags, webformatURL, largeImageURL }) => ({
      id,
      tags,
      webformatURL,
      largeImageURL,
    }))
  );
};

const api = {
  fetchImages,
};

export default api;
