const { sequelize } = require('./db');
const { Restaurant, Menu } = require('./models/index');
const { seedRestaurant, seedMenu } = require('./seedData');

describe('Restaurant and Menu Models', () => {
    beforeAll(async () => {
    // the 'sync' method will create tables based on the model class
    // by setting 'force:true' the tables are recreated each time the 
    // test suite is run
    await sequelize.sync({ force: true });
    });

  test('can create a Restaurant', async () => {
    // create a new restaurant
    const restaurant = await Restaurant.create({
        name: 'Rolling Rosotto',
        location: 'New York',
        cuisine: 'Italian',
    });

    // verify that the restaurant was created with the correct attributes
    expect(restaurant.name).toEqual('Rolling Rosotto');
    expect(restaurant.location).toEqual('New York');
    expect(restaurant.cuisine).toEqual('Italian');
    });

  test('can create a Menu', async () => {
    // create a new menu
    const menu = await Menu.create({
      title: 'La Cuisine',
    });

    // verify that the menu was created with the correct attributes
    expect(menu.title).toEqual('La Cuisine');
  });

  test('can find Restaurants', async () => {
    // create some seeded restaurants

    // find all restaurants in the database
    const foundRestaurants = await Restaurant.findAll();

    // verify that at least one restaurant was found and has the correct attributes
    expect(Array.isArray(foundRestaurants)).toBe(true);
    expect(foundRestaurants.length).toBeGreaterThan(0);
    expect(foundRestaurants[0].name).toBeDefined();
    expect(foundRestaurants[0].location).toBeDefined();
    expect(foundRestaurants[0].cuisine).toBeDefined();
  });

  test('can find Menus', async () => {
    // // create some seeded menus

    // find all menus in the database
    const foundMenus = await Menu.findAll();

    // verify that at least one menu was found and has the correct attributes
    expect(Array.isArray(foundMenus)).toBe(true);
    expect(foundMenus.length).toBeGreaterThan(0);
    expect(foundMenus[0].title).toBeDefined();
  });

  test('can delete a Restaurant', async () => {
    // create a new restaurant
    const restaurant = await Restaurant.create({
      name: 'Rolling Rosotto',
      location: 'New York',
      cuisine: 'Italian',
    });

    // delete the restaurant
    await restaurant.destroy();

    // attempt to find the deleted restaurant
    const foundRestaurant = await Restaurant.findByPk(restaurant.id);

    // verify that the restaurant was deleted
    expect(foundRestaurant).toBeNull();
  });

  afterAll(async () => {
    // close the Sequelize connection
    await sequelize.close();
  });
});
