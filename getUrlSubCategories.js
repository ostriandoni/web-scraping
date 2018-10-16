const _ = require('lodash');
const request = require('request');
const cheerio = require('cheerio');
const Promise = require('bluebird');

module.exports = function getUrlSubCategories(source) {
  return new Promise((resolve, reject) => {
    request(source, (err, res, html) => {
      if (err && res.statusCode !== 200) reject(err);

      const $ = cheerio.load(html);
      const links = [];
      const images = [];
      let urlSubCategories = [];

      $('#promolain').each((i, element) => {
        $(element).find('li > a').each((j, data) => {
          const link = $(data).attr('href');
          links.push({ id: j, link });
        });

        $(element).find('li > a > img').each((j, data) => {
          const image = $(data).attr('src');
          images.push({ id: j, image });
        });
      });

      urlSubCategories = _.merge(links, images);
      resolve(urlSubCategories);
    });
  });
};
