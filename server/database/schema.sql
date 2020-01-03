--I just manually copy pasted each statement in the order below.
CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  urlAddress TEXT NOT NULL
);

CREATE TABLE authors (
  id SERIAL PRIMARY KEY,
  firstName VARCHAR(32) NOT NULL,
  lastName VARCHAR(32) NOT NULL,
  photo INTEGER NOT NULL REFERENCES photos(id)
);

CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(64) NOT NULL,
  body TEXT NOT NULL,
  author INTEGER NOT NULL REFERENCES authors(id)
);

CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY,
  title VARCHAR(64) NOT NULL,
  articleArray INTEGER [] --each one REFERENCES articles(id)
);


-- CREATE TABLE restaurants2articles (
--   id SERIAL PRIMARY KEY,
--   restaurant INTEGER NOT NULL REFERENCES restaurants(id),
--   article INTEGER NOT NULL REFERENCES articles(id)
-- );
