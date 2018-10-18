const _ = require('lodash');
const fs = require('fs');
const Promise = require('bluebird');

const dir = `${__dirname}/data/`;

module.exports = function writePromotionDetail() {
  fs.readdir(dir, (err, files) => new Promise((resolve, reject) => {
    if (err) reject(err);

    let data;
    const contents = [];

    _.each(files, (file) => {
      if (_.includes(file, '.json')) {
        data = fs.readFileSync(`${dir}${file}`);
        data = JSON.parse(data);
        contents.push(data);
      }
    });

    const grouped = _.mapValues(_.groupBy(contents, 'category'),
      content => _.map(content, tmp => _.omit(tmp, 'category')));
    fs.appendFileSync('./solution.json', JSON.stringify(grouped));
    resolve('done');
  }));
};
