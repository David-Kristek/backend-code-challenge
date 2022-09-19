import { Db } from "../db/setupDb";
import { NexusGenInputs } from "../gen/nexus-typegen";
import Pokemon from "../models/Pokemon";
import { Type } from "../models/Type";
import { BaseController } from "./BaseController";

export class PokemonController extends BaseController {
  returnMaxMinValue = <T>(root: any, key: string) => ({
    maximal: root[`max_${key}`] as T,
    minimum: root[`min_${key}`] as T,
  });
  async insertPokemons(args: { data: NexusGenInputs["PokemonInputType"][] }) {
    const pokemonData = [];
    const pokemonTypes = [];
    const pokemonEvolutions = [];
    for (const pokemon of args.data) {
      const intId = parseInt(pokemon.id);
      for (const type of pokemon.types) {
        // gets type of pokemon
        const type_id = this.findPokemonType(type);
        pokemonTypes.push({ pokemon_id: pokemon.id, type_id });
      }
      for (const evolution of pokemon.evolutions ?? []) {
        // find evolution id in passed data
      }
      const { name, classification, fleeRate, evolutions, maxCP, maxHP } =
        pokemon;
      let newPokemon = {
        name,
        classification,
        fleeRate,
        evolutions,
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
      const res = await this.db.table("pokemon").insert(pokemonData);
      await this.db.table("pokemon_types").insert(pokemonTypes);
      await this.db.table("pokemon_evolutions").insert(pokemonEvolutions);
    } catch (error) {
      console.error(error);
    }
    return true;
  }
  private async findPokemonType(type: string) {
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
  }
  private async findPokemonEvolution(args: {
    data: NexusGenInputs["PokemonInputType"][];
  }) {
    const evolPokemonId = args.data.find(
      (pokemon: any) => parseInt(pokemon.id) === evolution.id
    )?.id;

    if (evolPokemonId) {
      pokemonEvolutions.push({
        evolution_id: evolPokemonId,
        pokemon_id: intId,
      });
      continue;
    }
    // find evolution id from db
    const evolutionPokemon = (await Pokemon.query()
      .where("id", evolution.id)
      .select("id")
      .first()) as any;

    if (evolutionPokemon?.id) {
      pokemonEvolutions.push({
        evolution_id: evolutionPokemon.id,
        pokemon_id: intId,
      });
      continue;
    }

    console.warn(
      `evolution cant be passed for pokemon ${pokemon.name} by ${evolution.name}`
    );
  }
}
