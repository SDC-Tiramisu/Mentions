//1m authors, 10m reviews, 10mrestaurants, 1k pictures
// write authors, reviews, and restaurants using maybe TSV? or CSV? but all to separate files.
// Figure out if reading/writing can be dome relatively separately for each file just a few linesa at a time or else split them into like maybe 100k per file.
// write pictures obviously  to their own file.

const faker = require('faker');
faker.seed(42); //so that if results are generated multiple times they are always consistent!

//consecutive IDs, lorem ipsum title
const generateRestaraunts = function(num, start = 0) {
  let restaurants = [];
  for (let i = start; i < n; i++) {
    let restaurant = {
      id: i,
      title: faker.company.companyName(),
    }
    restaurants.push[restaurant];
  }
  return restaurants;
};

//consecutive IDs, 1-10 random restaurant ids, lorem ipsum title, lorem ipsum body, random author id, random photo id
const generateArticles = function(n, start = 0) {
  let articles = [];
  for (let i = start; i < n; i++) {
    let article = {
      id: i,
      title: faker.lorem.words(parseInt(Math.random()*10+2)), //2-12 random words
      body: faker.lorem.paragraph(), //each review is 1 paragraph long.
      author: parseInt(Math.random()*1000000000), //random number [0,1mil)
    }
    article.restaurants = [];
    nRestaurants = 1 + Math.random()*10
    for (let i = 0; i < nRestaurants; i++) {
      article.restaurants.push(parseInt(Math.random() * 10000000000)) //random number [0, 10mil)
    }
    articles.push[article];
  }
  return articles;
}

//consecutive IDs, random first name, random last name,
const generateAuthors = function(n, start = 0) {
  let authors = [];
  for (let i = start; i < n; i++) {
    let author = {
      id: i,
      firstName: faker.name.firstName(),
      lastName: fake.name.lastName()
    }
    authors.push[author];
  }
  return authors;
};

//consecutive IDs, static photo
const generatePhotos = function(n, start = 0) {
  let photos = [];
  for (let i = start; i < n; i++) {
    let photo = {
      id: i,
      url: faker.image.image()
    }
    photos.push[photo];
  }
  return photos;
};

const saveToFile = function(array, filePath) { //array is what is being saved, filePath is, wlel, the file path

//check for file, possibly just always create/overwrite? Nah, requires too much to be held in memory so create OR open if already exists.
//write using streams/buffers ideally like one object at a time and keeping almost nothing in RAM. Possibly use fs.append(path, data, callback)
//make sure file is closed NO MATTER WHAT
// return... a promise?
};

//the function which actually DOES THE THING
() => {
  //create 10mil restaurants and call save multiple times throughout?
  for (let i = 0; i < 10000000; i += 10000) {
    let restaurants = generateRestaurants(10000, i);
    saveToFile(restaurants, 'restaurants.json')
  }
  //create 10mil articles and call save multiple times throughout?
  for (let i = 0; i < 10000000; i += 1000) {
    let articles = generateArticles(1000, i);
    saveToFile(articles, 'articles.json')
  }
  //create 1mil authors and call save multiple times throughout
  for (let i = 0; i < 1000000; i += 10000) {
    let articles = generateArticles(10000, i);
    saveToFile(articles, 'articles.json')
  }
  //create 1000 photos then save photos
  let photos = generatePhotos(1000);
  saveToFile(photos, 'photos.json');
}();
