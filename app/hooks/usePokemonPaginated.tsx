import { useEffect, useRef, useState } from "react";
import { pokemonApi } from "../api/pokemonApi";
import { PokemonPaginatedResponse, Result, SimplePokemon } from "../interfaces/PokemonInterfaces";


export const usePokemonPaginated = () => {
    const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([]);
    const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=40');

    const loadPokemons = async () => {
        const result = await pokemonApi.get<PokemonPaginatedResponse>(nextPageUrl.current);
        nextPageUrl.current = result.data.next;
        mapPokemonList(result.data.results);
    }

    //This function helps me to transform the data for save it in my state simplePokemonList
    const mapPokemonList = (pokemonList: Result[]) => {
        pokemonList.forEach( poke => console.log(poke.name));
    }

    useEffect(() => {
        loadPokemons();
    }, [])
}
