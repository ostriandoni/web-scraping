const _ = require('lodash');
const Promise = require('bluebird');
const getCategories = require('./getCategories');
const getPromotionDetail = require('./getPromotionDetail');
const writePromotionDetail = require('./writePromotionDetail');

const source = 'https://www.bankmega.com';
let link = `${source}/promolainnya.php`;

function delay(x) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(x);
    }, 45000);
  });
}

getCategories(link)
  .then((urlCategories) => {
    const promises = [];
    _.map(urlCategories, (item) => {
      link = `${source}/${item.url}`;
      promises.push(getPromotionDetail(item.category, source, link));
    });

    return Promise.all(promises);
  })
  .then(async () => {
    const isDone = await delay(1);

    if (isDone) {
      writePromotionDetail();
    }
  });
