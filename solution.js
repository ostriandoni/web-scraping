const _ = require('lodash');
const Promise = require('bluebird');
const getUrlCategories = require('./getUrlCategories');
const getUrlSubCategories = require('./getUrlSubCategories');

const source = 'https://www.bankmega.com';
let link = `${source}/promolainnya.php`;

getUrlCategories(link).then((urlCategories) => {
  console.log('start...');
  return Promise.all(
    _.map(urlCategories, (item) => {
      link = `${source}/${item.url}`;
      return getUrlSubCategories(link).then((aa) => {
        console.log(aa);
      });
    })
  );
});
