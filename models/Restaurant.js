const {sequelize} = require('../db');
const { Sequelize } = require('sequelize');

// Done - create a Restaurant model
const Restaurant = sequelize.define('Restaurant', {
    name: Sequelize.STRING,
    location: Sequelize.STRING,
    cuisine: Sequelize.STRING
});

module.exports = {Restaurant};