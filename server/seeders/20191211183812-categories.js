const data = require('../data/Categories.json');

function getData() {
  return data.map(({id, name}) => ({ id, name }))
}

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Categories', getData(), {}),

  down: queryInterface => Sequelize.bulkDelete('Categories', null, {}) 
};
