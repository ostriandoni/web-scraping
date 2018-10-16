const getUrlCategories = require('./getUrlCategories');

const source = 'https://www.bankmega.com/promolainnya.php';

getUrlCategories(source).then((result) => {
  console.log(result);
});
