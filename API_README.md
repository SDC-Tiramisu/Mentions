This server implements a basic CRUD API for accessing the database through HTTP requests to the server.

C(reate): Creates the record for the restaurant if it does not exist for restaurant with id=:id by calling /api/restaurants/create/:id

R(ead): Returns the record if it exists for restaurant with id=:id by calling /api/restaurants/read/:id

U(pdate): Changes the record for the restaurant to add articleId to restaurant.articles assuming id=:id for restaurant by calling /api/restaurants/updated/:id

D(elete): Delete the record for the restaurant with id=:id by calling /api/restaurants/delete:id