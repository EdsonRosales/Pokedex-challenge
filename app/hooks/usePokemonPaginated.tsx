import { useEffect } from "react";
import { pokemonApi } from "../api/pokemonApi";


export const usePokemonPaginated = () => {

    const url = 'https://pokeapi.co/api/v2/pokemon?limit=40';

    const loadPokemons = async () => {
        const result = await pokemonApi.get(url);
        console.log(result);
    }

    useEffect(() => {
        loadPokemons();
    }, [])
}
