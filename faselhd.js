const axios = require('axios');
const cheerio = require('cheerio');

const BASE_URL = 'https://www.faselhds.care';

module.exports = {
  search: async (query) => {
    const url = `${BASE_URL}/search?q=${encodeURIComponent(query)}`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    let results = [];
    $('.movie-item').each((index, element) => {
      const title = $(element).find('.movie-title').text().trim();
      const id = $(element).find('a').attr('href');
      const image = $(element).find('img').attr('src');
      results.push({ title, id, image });
    });

    return results;
  },

  getDetails: async (id) => {
    const url = `${BASE_URL}${id}`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const title = $('.movie-title').text().trim();
    const description = $('.movie-description').text().trim();
    const genres = [];
    $('.movie-genres a').each((index, element) => {
      genres.push($(element).text().trim());
    });

    return { title, description, genres };
  }
};
