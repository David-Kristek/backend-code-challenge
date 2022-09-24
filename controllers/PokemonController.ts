import { bind } from "lodash";
import { Db } from "../db/setupDb";
import { NexusGenInputs } from "../gen/nexus-typegen";
import Pokemon from "../models/Pokemon";
import { Type } from "../models/Type";
import { BaseController } from "./BaseController";

const MAX_QUERY_LIMIT = 100;

interface getPokemonsProps {
  limit?: number | null;
  offset?: number | null;
  search?: string | null;
}

export class PokemonController extends BaseController {
  getPokemons({ offset, limit, search }: getPokemonsProps) {
    const searchFormatted = defaultNameLetterHeight(search);
    // if (search)
    return Pokemon.query()
      .limit(limit ?? MAX_QUERY_LIMIT)
      .offset(offset ?? 0)
      .whereRaw(`name LIKE '%${searchFormatted}%'`)
      .withGraphFetched("[types, evolutions]")
      // .withGraphJoined("[types, evolutions]")
      // .modifyGraph('types', builder => {
      //   builder.where("type", "Fire")
      // })
      // .modifiers({
      //   filterType(builder) {
      //     builder.where("type", "Fire")
      //   },
      // });
      // .where("types.type", "Fire")
  }
  async insertPokemons(args: { data: NexusGenInputs["PokemonInputType"][] }) {
    const pokemonData = [];
    const pokemonTypes = [];
    const pokemonEvolutions = [];
    for (const pokemon of args.data) {
      const intId = parseInt(pokemon.id);
      for (const type of pokemon.types) {
        // gets type of pokemon
        const type_id = await findPokemonType(type);
        pokemonTypes.push({ pokemon_id: intId, type_id });
      }
      for (const evolution of pokemon.evolutions ?? []) {
        // gets evolutions for pokemon;
        const evolution_id = await findPokemonEvolution(
          args.data,
          evolution.id
        );
        if (evolution_id)
          pokemonEvolutions.push({ evolution_id, pokemon_id: intId });
      }

      const { name, classification, fleeRate, maxCP, maxHP } = pokemon;
      const newPokemon = {
        name,
        classification,
        fleeRate,
        maxCP,
        maxHP,
        min_weight: pokemon.weight.minimum,
        max_weight: pokemon.weight.maximum,
        min_height: pokemon.height.minimum,
        max_height: pokemon.height.maximum,
        id: intId,
      };
      pokemonData.push(newPokemon);
    }
    try {
      await this.db.table("pokemon").insert(pokemonData);
      await this.db.table("pokemon_types").insert(pokemonTypes);
      await this.db.table("pokemon_evolutions").insert(pokemonEvolutions);
    } catch (error) {
      console.error(error);
    }
    return true;
  }
}

const findPokemonType = async (type: string) => {
  const existingType = await Type.query()
    .select("id")
    .where("type", type)
    .first();
  if (!existingType) {
    // create new type
    const res = await Type.query().insert({ type });
    return res.id;
  }
  return existingType.id;
};

const findPokemonEvolution = async (
  data: NexusGenInputs["PokemonInputType"][],
  evolvePokemonId: number
) => {
  const evolutionPokemonId = data.find(
    (pokemon: any) => parseInt(pokemon.id) === evolvePokemonId
  )?.id;

  if (evolutionPokemonId) return parseInt(evolutionPokemonId);

  // find evolution id from db
  const evolutionPokemonDb = (await Pokemon.query()
    .where("id", evolvePokemonId)
    .select("id")
    .first()) as any;

  if (evolutionPokemonDb?.id) return evolutionPokemonDb.id;

  console.warn(
    `evolution cant be passed for pokemon with id: ${evolvePokemonId}`
  );
};
const defaultNameLetterHeight = (word?: string | null) => {
  return word ? `${word[0].toUpperCase()}${word.toLowerCase().slice(1)}` : "";
};
