'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GameLists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  GameLists.init({
    id: {
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4
    },
    game_name: {
      type: DataTypes.STRING
    },
    description_game: {
      type: DataTypes.TEXT
    },
    image_url: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'GameLists',
  });
  return GameLists;
};