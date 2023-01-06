'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Booking extends Model {
        //định danh quan hệ
        static associate(models) {
            // define association here
        }
    };
    Booking.init({
        statusId: DataTypes.STRING,
        docterId: DataTypes.INTEGER,
        patientID: DataTypes.INTEGER,
        date: DataTypes.DATE,
        timeType: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Booking',
    });
    return Booking;
};