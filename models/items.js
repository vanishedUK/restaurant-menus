const {sequelize} = require('../db');
const { Sequelize } = require('sequelize');

const Items = sequelize.define('Items', {
    name: Sequelize.STRING,
    image: Sequelize.STRING,
    price: Sequelize.INTEGER,
    vegetarian: Sequelize.BOOLEAN
})

module.exports = {Items};