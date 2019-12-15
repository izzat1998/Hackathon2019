const data = require('../data/Categories.json');

function getData() {
  return data.reduce((a, { id:categoryId, subCategories }) => a.concat(
    subCategories.map(({ name }) => ({
      categoryId,
      name,
    }))
  ), []);
}

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('SubCategories', getData(), {}),

  down: queryInterface => Sequelize.bulkDelete('SubCategories', null, {}) 
};
