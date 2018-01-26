'use strict';
module.exports = (sequelize, DataTypes) => {
  var Pets = sequelize.define('Pets', {
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    species: DataTypes.STRING,
    birthday: DataTypes.DATE,
    favoriteFood: DataTypes.STRING,
    picUrl: DataTypes.STRING,
    picUrlSq: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Pets;
};
