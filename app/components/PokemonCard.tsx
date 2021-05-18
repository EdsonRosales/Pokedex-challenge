import React, { useEffect, useRef, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native'
import ImageColors from "react-native-image-colors"
import { useNavigation } from '@react-navigation/core';
import { SimplePokemon } from '../interfaces/PokemonInterfaces'
import { FadeInImage } from './FadeInImage';

const windowWidth = Dimensions.get('window').width;

//Properties for pokemonCard
interface Props {
    pokemon: SimplePokemon;
}

export const PokemonCard = ({ pokemon }: Props ) => {

    const [bgColor, setBgColor] = useState('grey');
    const isMounted = useRef(true);
    const navigation = useNavigation()

    //Handle the background color of each card based on pokemon's color
    useEffect(() => {
        ImageColors.getColors(pokemon.picture, { fallback: 'grey' })
            .then( colors => {
                if (!isMounted.current) return;

                (colors.platform === 'android')
                    ? setBgColor(colors.dominant || 'grey')
                    : setBgColor(colors.background || 'grey')
            });
        return () => {
            isMounted.current === false;
        }    
    }, [])

    return (
        <TouchableOpacity onPress={() => navigation.navigate("PokemonScreen", { simplePokemon: pokemon, color: bgColor })}>
            <View style={{...styles.cardContainer, width: windowWidth * 0.4, backgroundColor: bgColor}}>
                {/* Name of Pokemon's and ID */}
                <View>
                    <Text style={styles.name}>
                        {pokemon.name}
                        {'\n#' + pokemon.id}
                    </Text>
                </View>

                <View style={styles.pokebolaContainer}>
                    <Image
                        source={require('../assets/pokebola-blanca.png')}
                        style={styles.pokebola}
                    />
                </View>

                <FadeInImage
                    uri={pokemon.picture}
                    style={styles.pokemonImage}
                />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10,
        height: 120,
        width: 160,
        marginBottom: 25,
        borderRadius: 10,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        
        elevation: 6,
    },
    name: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        top: 20,
        left: 10,
    },
    pokebola: {
        width: 100,
        height: 100,
        position: 'absolute',
        bottom: -20,
        right: -20,
    },
    pokemonImage: {
        width: 100,
        height: 100,
        position: 'absolute',
        right: -8,
        bottom: -5,
    },
    pokebolaContainer: {
        width: 100,
        height: 100,
        position: 'absolute',
        bottom: 0,
        right: 0,
        overflow: 'hidden',
        opacity: 0.6,
    }
})
