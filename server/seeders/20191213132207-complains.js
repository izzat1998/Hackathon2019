const Complains = require('../data/Complains.json');
const all = Complains.map(body => ({
  ...body,
  comment: "HELLO WORLD"
}))
module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Complains', all, {}),

  down: queryInterface => queryInterface.bulkDelete('Complains', null, {})
};
