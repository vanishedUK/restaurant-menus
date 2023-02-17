const {sequelize} = require('../db');
const { Sequelize } = require('sequelize');

// DONE - create a Menu model
const Menu = sequelize.define('Menu', {
    title: Sequelize.STRING
})

module.exports = {Menu};