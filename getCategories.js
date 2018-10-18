const _ = require('lodash');
const request = require('request');
const cheerio = require('cheerio');
const Promise = require('bluebird');

module.exports = function getCategories(source) {
  return new Promise((resolve, reject) => {
    request(source, (err, res, html) => {
      if (err && res.statusCode !== 200) reject(err);

      const $ = cheerio.load(html);
      let urlCategories = [];

      $('div[id="contentpromolain2"]').find('div > script').each((index, element) => {
        const scriptContent = element.children[index].data;
        let categories = scriptContent.match(/([a-z]).+(click)/g);
        categories = _.map(categories, (content) => {
          const temp = content.split('"');
          const data = {
            category: temp[0],
            url: ''
          };
          return data;
        });

        let links = scriptContent.match(/(contentpromolain2).+([a-z0-9=])\w+/g);
        links = _.map(links, (content) => {
          const temp = content.split('"');
          const data = {
            url: temp[2]
          };
          return data;
        });

        urlCategories = _.merge(categories, links);
        resolve(urlCategories);
      });
    });
  });
};
