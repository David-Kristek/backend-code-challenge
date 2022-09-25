import { GraphQLClient, gql } from "graphql-request";
const pokemons = require("../../pokemons.json");

let timeMs = 0;
const interval = setInterval(() => (timeMs += 1), 1);

const query = gql`
  mutation ($data: [PokemonInputType!]!) {
    addPokemon(data: $data)
  }
`;

pokemons.forEach((p: any) => {
  delete p.resistant;
  delete p.weaknesses;
  delete p.evolutionRequirements;
  delete p.attacks;
  delete p.weaknesses;
  delete p["Previous evolution(s)"];
  delete p["Common Capture Area"];
  delete p["Asia"];
  delete p["Australia, New Zealand"];
  delete p["Western Europe"];
  delete p["North America"];
  delete p["Pokémon Class"];
  delete p["LEGENDARY"];
  delete p["MYTHIC"];
});

const client = new GraphQLClient("http://localhost:4000/");

client
  .request(query, { data: pokemons })
  .then((res) => {
    if (res.addPokemon) {
      
      console.log(
        `${pokemons.length} pokemons succefully added to database ✅`
      );
    } else {
      console.log("Inserting pokemons failed 😥");
    }
  })
  .catch((err) =>
    console.log("Inserting pokemons failed 😥, see the error: ", err)
  ).finally(() => {
    clearInterval(interval);
    console.log(`in ${timeMs}ms`)
  });
