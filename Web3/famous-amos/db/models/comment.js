'use strict';
module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define('Comment', {
    content: DataTypes.TEXT
    // PetId: DataTypes.INTEGER
  });

  Comment.associate = function(models) {
      Comment.belongsTo(models.Pet)
  }

  return Comment;
};
