const { sequelize } = require('./db');
const { Restaurant, Menu, Items } = require('./models/index');
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
    const menu_1 = await Menu.create({
      title: 'La Cuisine',
    });

    const menu_2 = await Menu.create({
      title: 'Fried Chickene'
    })

    // verify that the menu was created with the correct attributes
    expect(menu_1.title).toEqual('La Cuisine');
    expect(menu_2.title).toEqual('Fried Chickene')
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


  test('Find all menus with items', async () => {
    // create a new menu
    const menu_1 = await Menu.create({
      title: 'La Cuisine',
    });

    const menu_2 = await Menu.create({
      title: 'Fried Chickene'
    })

    // create new items
    const item_1 = await Items.create({
      name: 'Pizza',
      image: 'https://en.wikipedia.org/wiki/File:Eq_it-na_pizza-margherita_sep2005_sml.jpg',
      price: 11.5,
      vegetarian: true,
      MenuId: menu_1.id
    });
    
    const item_2 = await Items.create({
      name: 'Fried Chicken',
      image: 'https://en.wikipedia.org/wiki/File:Fried-Chicken-Set.jpg',
      price: 8.25,
      vegetarian: false,
      MenuId: menu_2.id
    });

    // find all menus with items
    const result = await Menu.findAll({include: Items});

    // menu 1
    expect(result[0].title).toBe('La Cuisine');
    expect(result[0].Items[0].name).toBe('Pizza')

    // menu 2
    expect(result[1].title).toBe('Fried Chickene');
    expect(result[1].Items[0].name).toBe('Fried Chicken')
  });

  afterAll(async () => {
    // close the Sequelize connection
    await sequelize.close();
  });
});
