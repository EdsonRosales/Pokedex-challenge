import { useEffect, useState } from "react"
import { pokemonApi } from "../api/pokemonApi";
import { PokemonFullData } from "../interfaces/PokemonInterfaces";

export const usePokemon = ( id: string ) => {

    const [isLoading, setIsLoading] = useState(true);
    //This state keeps the full data of the pokemon
    const [pokemon, setPokemon] = useState<PokemonFullData>({} as PokemonFullData);

    //With this function send a petition to get the full data from the API
    const loadPokemon = async () => {
        const result = await pokemonApi.get<PokemonFullData>(`https://pokeapi.co/api/v2/pokemon/${id}`);
        // console.log(result);
        setPokemon(result.data);
        setIsLoading(false);
    }

    useEffect(() => {
        loadPokemon();
    }, [])

    return{
        isLoading,
        pokemon,
    }
}
