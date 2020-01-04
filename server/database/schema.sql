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
  title VARCHAR(128) NOT NULL,
  body TEXT NOT NULL,
  author INTEGER NOT NULL REFERENCES authors(id)
);

CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY,
  title VARCHAR(128) NOT NULL,
  articleArray INTEGER [] --each one REFERENCES articles(id)
);


-- CREATE TABLE restaurants2articles (
--   id SERIAL PRIMARY KEY,
--   restaurant INTEGER NOT NULL REFERENCES restaurants(id),
--   article INTEGER NOT NULL REFERENCES articles(id)
-- );

-- the following below this is neo4j stuff.
-- nodes:
-- CREATE (p:Photo {id: ${id}, url: ${url}})
-- CREATE (a:Author {id: ${id}, firstName: ${firstName}, lastName: ${lastName}})
-- CREATE (a:Article {id: ${id}, title: ${title}, body: ${body}})
-- (r:Restaurant {id: ${id}, title: ${title}})
-- edges:
-- CREATE (photo:Photo {id: ${id1}})-[:PICTURE_OF]->(author:Author {id: ${id2}})
-- CREATE (article:Article {id: ${id1}})-[:WRITTEN_BY]->(author:Author {id: ${id2}})
-- CREATE (restaurant:Restaurant {id: ${id1}})-[:REVIEWED_BY]->(article:Article {id: ${id2}})