const _ = require('lodash');
// const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
// const Promise = require('bluebird');

const source = 'https://www.bankmega.com/promolainnya.php';
// const source = 'https://www.bankmega.com/ajax.promolainnya.php?product=0&subcat=1';

request(source, (err, res, html) => {
  if (err && res.statusCode !== 200) throw err;
  const $ = cheerio.load(html);
  let urlCategories = [];

  // step 1: populate url of each categories
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
  });
  console.dir(urlCategories);

  // step 2
  // let links = [];
  // let images = [];
  // $('#promolain').each((i, element) => {
  //   $(element).find('li > a').each((j, data) => {
  //     const link = $(data).attr('href');
  //     links.push({ id: j, link });
  //   });
  //   $(element).find('li > a > img').each((j, data) => {
  //     const image = $(data).attr('src');
  //     images.push({ id: j, image });
  //   });
  // });
  // console.log(_.merge(links, images));

  // const content = {
  //   categories
  // };

  // const output = JSON.stringify(content);
  // fs.writeFile('solution.json', output, (error) => {
  //   if (error) throw error;
  // });
  // const pomolain = [];
  // $('ul[id="promolain"]').find('li > a').each((index, element) => {
  //   pomolain.push($(element).attr('href'));
  // });
  // console.dir(pomolain);
});
