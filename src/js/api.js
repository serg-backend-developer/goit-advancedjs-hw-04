import axios from 'axios';

const API_URL = 'https://pixabay.com/api/';
const KEY = '44145043-d94906ce2cc1245071fea5b6f';

export async function searchImages(query, page = 1, limit = 30) {
  const response = await axios.get(
    `${API_URL}/?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${limit}&page=${page}`
  );

  const hits = response.data.hits.map(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    })
  );

  return {
    hits,
    total: response.data.totalHits,
  };
}
