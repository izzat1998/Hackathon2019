'use strict';
module.exports = (sequelize, DataTypes) => {
  const Complain = sequelize.define('Complain', {
    userId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    subCategoryId: DataTypes.INTEGER,
    lat: DataTypes.DOUBLE,
    long: DataTypes.DOUBLE,
    image: DataTypes.STRING,
    status: DataTypes.INTEGER,
    comment: DataTypes.STRING,
  }, {});
  Complain.associate = (models) => {
    Complain.belongsTo(models.User, { as: 'user' });
    Complain.belongsTo(models.Category, { as: 'category' });
    Complain.belongsTo(models.SubCategory, { as: 'subCategory' });
  };
  return Complain;
};