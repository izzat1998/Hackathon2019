'use strict';
module.exports = (sequelize, DataTypes) => {
  const Form = sequelize.define('Form', {
    userId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    subCategoryId: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    image: DataTypes.STRING
  }, {});
  Form.associate = function(models) {
    // associations can be defined here
  };
  return Form;
};