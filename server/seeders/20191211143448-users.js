const hash = require('bcrypt').hashSync;

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', [
    {
      id: 1,
      firstName: 'Bill gates',
      secondName: 'Bill gates',
      username: 'billgates',
      password:  hash('billgates', 7),
      image: 'https://pbs.twimg.com/profile_images/988775660163252226/XpgonN0X_400x400.jpg'
    },
    {
      id: 2,
      firstName: 'Admin',
      secondName: 'Admin',
      username: 'admin',
      password:  hash('admin', 7),
      image: 'https://static.tgstat.ru/public/images/channels/_0/7c/7c1085ed2398f12d4917d13fa5b9bc66.jpg'
    },
    {
      id: 3,
      firstName: 'Steve',
      secondName: 'Jobs',
      username: 'steve',
      password:  hash('steve', 7),
      image: 'https://cdn.theatlantic.com/assets/media/old_wire/img/upload/2011/10/steve-jobs-2/lead_720_405.jpg?mod=1533691471'
    },
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
