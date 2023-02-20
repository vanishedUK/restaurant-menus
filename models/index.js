const {Restaurant} = require('./Restaurant')
const {Menu} = require('./Menu')
const {Items} = require('./Items')

Restaurant.hasMany(Menu);
Menu.belongsTo(Restaurant);
Menu.hasMany(Items);
Items.belongsTo(Menu);

module.exports = { Restaurant, Menu, Items }
