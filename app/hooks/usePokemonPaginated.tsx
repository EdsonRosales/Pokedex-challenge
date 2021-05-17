import { useEffect, useRef, useState } from "react";
import { pokemonApi } from "../api/pokemonApi";
import { PokemonPaginatedResponse, Result, SimplePokemon } from "../interfaces/PokemonInterfaces";


export const usePokemonPaginated = () => {
    const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=40');

    const loadPokemons = async () => {
        setIsLoading(true);
        const result = await pokemonApi.get<PokemonPaginatedResponse>(nextPageUrl.current);
        nextPageUrl.current = result.data.next;
        mapPokemonList(result.data.results);
    }

    //This function helps me to transform the data for save it in my state simplePokemonList
    const mapPokemonList = (pokemonList: Result[]) => {
        const newPokemonList: SimplePokemon[] = pokemonList.map(({ name, url }) => {
            // "https://pokeapi.co/api/v2/pokemon/2/"
            const urlParts = url.split('/');
            // console.log(urlParts);
            const id = urlParts[ urlParts.length - 2 ];
            // console.log({id});
            const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

            return { id, picture, name };
        });

        setSimplePokemonList([ ...simplePokemonList, ...newPokemonList ])
        setIsLoading(false);
    }

    useEffect(() => {
        loadPokemons();
    }, [])

    return {
        isLoading,
        simplePokemonList,
        loadPokemons,
    }
}
