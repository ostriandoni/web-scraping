const _ = require('lodash');
const fs = require('fs');
const rp = require('request-promise');
const cheerio = require('cheerio');
const Promise = require('bluebird');

function populatePromoDetail(category, home, url, page) {
  rp(`${home}/${url}`)
    .then((html) => {
      const $ = cheerio.load(html);
      let promoDetail = {};

      $('div[id="contentpromolain2"]').each((i, element) => {
        const image = $(element).find('img').attr('src');
        promoDetail = {
          category,
          title: $(element).find('h3').text().trim(),
          area: $(element).children('.area').text(),
          period: $(element).children('.periode').text()
            .replace(/\n/g, '')
            .replace(/\t/g, ''),
          image: `${home}${image}`
        };
      });

      const output = JSON.stringify(promoDetail);
      const filename = `data/${category}-${page}.json`;
      fs.writeFileSync(filename, output);
    })
    .catch((err) => {
      throw err;
    });
}

function populateSubCategories(category, home, url, page) {
  rp(url)
    .then((html) => {
      const $ = cheerio.load(html);
      const subCategories = [];
      const promises = [];

      $('#promolain').each((i, element) => {
        $(element).find('li > a').each((j, data) => {
          const link = $(data).attr('href');
          subCategories.push({ category, link });
        });
      });

      if (subCategories.length > 0) {
        _.map(subCategories, (item) => {
          promises.push(populatePromoDetail(item.category, home, item.link, page));
        });
      }
    })
    .catch((err) => {
      throw err;
    });
}

function getPromotionDetail(category, home, source) {
  const allPages = [];

  for (let i = 1; i < 11; i++) {
    allPages.push({ page: i, url: `${source}&page=${i}` });
  }

  Promise.all(_.map(allPages, (item) => {
    populateSubCategories(category, home, item.url, item.page);
  }));
}

module.exports = getPromotionDetail;
