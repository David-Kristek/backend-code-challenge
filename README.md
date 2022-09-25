# Coding Exercise Backend

This repository contains a coding exercise for new developers joining the backend development team.

Fork this repository and create your own exercise!

### How to run 
Run docker and then type in your terminal 
```
docker compse up
```
Run to create tables
```
npm run migrate
```
Now you can seed all pokemons to database with command 
```
npm run seed
```
Now go to http://localhost:400/ and click on query your server. You can write all queries there. 
You can also delete everything from database with 
```
npm run delete
```


## What we want you to build

We have provided you with Pokemon data in a json file. Your mission is to create a database and expose the database to an API. Basically, you need to:

- [x] Design the database to store information for the Pokemon data
- [x] Load the database with the data
- Implement the API Interface with the following features:
  - Query pokemons with the options:
    - [x] Pagination
    - [x] Search by name
    - [x] Filter by pokemon type
    - [x] Filter by favorite
  - [x] Query a pokemon by id
  - [x] Query a pokemon by name
  - [x] Query list of pokemon types
  - [x] Mutation to mark/unmark pokemon as favorite
- [ ] Test are important and if time allows it, we'd like to see some test coverage

## Technology

Stack I used

- Node.js (Typescript, apollo-server)
- GraphQL (Nexus)
- PostgreSQL (knex, Objection.js)

