//1m authors, 10m reviews, 10mrestaurants, 1k pictures
// write authors, reviews, and restaurants using maybe TSV? or CSV? but all to separate files.
// Figure out if reading/writing can be dome relatively separately for each file just a few linesa at a time or else split them into like maybe 100k per file.
// write pictures obviously  to their own file.

const faker = require('faker');
const fs = require('fs');
faker.seed(42); //so that if results are generated multiple times they are always consistent!

//consecutive IDs, lorem ipsum title
const generateRestaurants = function(n, start = 0) {
  let restaurants = [];
  for (let i = start; i < n+start; i++) {
    let restaurant = {
      id: i,
      title: faker.company.companyName()
    };
    restaurants.push(restaurant);
  }
  return restaurants;
};

//consecutive IDs, 1-10 random restaurant ids, lorem ipsum title, lorem ipsum body, random author id, random photo id
const generateArticles = function(n, start = 0) {
  let articles = [];
  for (let i = start; i < n+start; i++) {
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
    articles.push(article);
  }
  return articles;
}

//consecutive IDs, random first name, random last name,
const generateAuthors = function(n, start = 0) {
  let authors = [];
  for (let i = start; i < n+start; i++) {
    let author = {
      id: i,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName()
    }
    authors.push(author);
  }
  return authors;
};

//consecutive IDs, static photo
const generatePhotos = function(n, start = 0) {
  let photos = [];
  for (let i = start; i < n+start; i++) {
    let photo = {
      id: i,
      url: faker.image.image()
    }
    photos.push(photo);
  }
  return photos;
};

const saveToFile = function(array, filePath) { //array is what is being saved, filePath is, wlel, the file path
  let fd;
  try {
    //check for file, possibly just always create/overwrite? Nah, requires too much to be held in memory so create OR open if already exists.
    fd = fs.openSync(filePath, 'as');
    //write using streams/buffers ideally like one object at a time and keeping almost nothing in RAM. Possibly use fs.append(path, data, callback)
    for (let elt of array) {
          fs.appendFileSync(fd, `${JSON.stringify(elt)},\n`);
    }
  } catch (err) {
    console.log('file opening/writing error: ' + err);
  } finally {
    //make sure file is closed NO MATTER WHAT
    fs.closeSync(fd)
  }
  // return... a promise?
  return null; //for now return nothing because asycnhronously messing with a single file is probably bad mojo
};

//the function which actually DOES THE THING
const script = () => {
  let filePath, fd; //variables used throughout for convenience.

  //create 10mil restaurants and call save multiple times throughout?
  console.log('starting restaurants save.')
  filePath = 'server/database/restaurants.json'
  try {
    fd = fs.openSync(filePath, 'as');
    fs.appendFileSync(fd, '[\n');
  } catch (err) {
    console.log('file opening/writing error: ' + err);
  } finally {
    fs.closeSync(fd)
  }
  for (let i = 0; i < 10000000; i += 10000) {
    let restaurants = generateRestaurants(10000, i);
    saveToFile(restaurants, filePath);
  }
  try {
    fd = fs.openSync(filePath, 'as');
    fs.appendFileSync(fd, ']\n');
  } catch (err) {
  console.log('file opening/writing error: ' + err);
  } finally {
    fs.closeSync(fd)
  }

  //create 10mil articles and call save multiple times throughout?
  console.log('starting articles saving.')
  filePath = 'server/database/articles.json'
  try {
    fd = fs.openSync(filePath, 'as');
    fs.appendFileSync(fd, '[\n');
  } catch (err) {
  console.log('file opening/writing error: ' + err);
  } finally {
    fs.closeSync(fd)
  }
  for (let i = 0; i < 10000000; i += 1000) {
    let articles = generateArticles(1000, i);
    saveToFile(articles, filePath);
  }
  try {
    fd = fs.openSync(filePath, 'as');
    fs.appendFileSync(fd, ']\n');
  } catch (err) {
  console.log('file opening/writing error: ' + err);
  } finally {
    fs.closeSync(fd)
  }

  //create 1mil authors and call save multiple times throughout
  console.log('starting authors saving.')
  filePath = 'server/database/authors.json'
  try {
    fd = fs.openSync(filePath, 'as');
    fs.appendFileSync(fd, '[\n');
  } catch (err) {
  console.log('file opening/writing error: ' + err);
  } finally {
    fs.closeSync(fd)
  }
  for (let i = 0; i < 1000; i += 1000000) {
    let authors = generateAuthors(1000, i);
    saveToFile(authors, filePath);
  }
  try {
    fd = fs.openSync(filePath, 'as');
    fs.appendFileSync(fd, ']\n');
  } catch (err) {
  console.log('file opening/writing error: ' + err);
  } finally {
    fs.closeSync(fd)
  }

  //create 1000 photos then save photos
  console.log('starting photos saving.')
  filePath = 'server/database/photos.json'
  try {
    fd = fs.openSync(filePath, 'as');
    fs.appendFileSync(fd, '[\n');
  } catch (err) {
  console.log('file opening/writing error: ' + err);
  } finally {
    fs.closeSync(fd)
  }
  let photos = generatePhotos(1000);
  saveToFile(photos, filePath);
  try {
    fd = fs.openSync(filePath, 'as');
    fs.appendFileSync(fd, ']\n');
  } catch (err) {
  console.log('file opening/writing error: ' + err);
  } finally {
    fs.closeSync(fd)
  }
};

//this is a completely unnecessary way of writing things but I'm trying to figure out how to accurately show this is a bunch of stuff then a script....
script();