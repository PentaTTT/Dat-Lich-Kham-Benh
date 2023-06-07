'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Specialty extends Model {
        //định danh quan hệ
        static associate(models) {
            // define association here
            Specialty.hasMany(models.Doctor_Info, { foreignKey: 'specialtyId', as: 'specialtyName' })
        }
    };
    Specialty.init({
        name: DataTypes.STRING,
        descriptionHTML: DataTypes.TEXT,
        descriptionMarkdown: DataTypes.TEXT,
        image: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Specialty',
    });
    return Specialty;
};