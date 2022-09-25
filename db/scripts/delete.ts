import { GraphQLClient, gql } from "graphql-request";

const query = gql`
  mutation {
    drop
  }
`;
const client = new GraphQLClient("http://localhost:4000/");
client
  .request(query)
  .then((res) => {    
    if (res.drop) {
      console.log(`Pokemons removed from database ✅ `);
    } else {
      console.log("Removing failed😥");
    }
  })
  .catch((err) =>
    console.log("Removing failed😥, see the error: ", err)
  );
