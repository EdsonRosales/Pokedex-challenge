import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { PokemonFullData } from '../interfaces/PokemonInterfaces'
import { FadeInImage } from './FadeInImage'

interface Props {
    pokemon: PokemonFullData;
}

export const PokemonDetails = ({ pokemon }: Props) => {
    return (
        <ScrollView style={{...StyleSheet.absoluteFillObject}}>
            {/* Types Container */}
            <View style={{...styles.container, marginTop: 370}}>
                <Text style={styles.title}>
                    Types
                </Text>
                <View style={{flexDirection: 'row'}}>
                    {
                        pokemon.types.map( ({ type }) => (
                            <Text style={{...styles.regularText, marginRight: 10}} key={type.name}>
                                { type.name }
                            </Text>
                        ))
                    }
                </View>

                {/* Weight */}
                <Text style={styles.title}>Weight</Text>
                <Text style={styles.regularText}>{pokemon.weight} lb</Text>

            </View>
            {/* End Types and weight container */}


            {/* Sprites */}
            <View style={styles.container}>
                <Text style={styles.title}>Sprites</Text>
            </View>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <FadeInImage
                    uri={pokemon.sprites.front_default}
                    style={styles.basicSprites}
                />
                <FadeInImage
                    uri={pokemon.sprites.back_default}
                    style={styles.basicSprites}
                />
                <FadeInImage
                    uri={pokemon.sprites.front_shiny}
                    style={styles.basicSprites}
                />
                <FadeInImage
                    uri={pokemon.sprites.back_shiny}
                    style={styles.basicSprites}
                />
            </ScrollView>
            {/* End of sprites */}

            {/* Skills */}
            <View style={styles.container}>
                <Text style={styles.title}>
                    Base Skills
                </Text>
                <View style={{flexDirection: 'row'}}>
                    {
                        pokemon.abilities.map( ({ ability }) => (
                            <Text style={{...styles.regularText, marginRight: 10}} key={ability.name}>
                                { ability.name }
                            </Text>
                        ))
                    }
                </View>
            </View>
            {/* End of Skills */}

            {/* Moves */}
            <View style={styles.container}>
                <Text style={styles.title}>
                    Moves
                </Text>
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    {
                        pokemon.moves.map( ({ move }) => (
                            <Text style={{...styles.regularText, marginRight: 10}} key={move.name}>
                                { move.name }
                            </Text>
                        ))
                    }
                </View>
            </View>
            {/* End of Moves */}

            {/* Stats */}
            <View style={styles.container}>
                <Text style={styles.title}>
                    Stats
                </Text>
                <View>
                    {
                        pokemon.stats.map( ( stat, i ) => (
                            <View key={stat.stat.name + i} style={{flexDirection: 'row'}}>
                                <Text 
                                    style={{...styles.regularText, marginRight: 10, width: 150}} 
                                    key={stat.stat.name}
                                >
                                    { stat.stat.name }
                                </Text>
                                <Text style={{...styles.regularText, fontWeight: 'bold'}}>
                                    { stat.base_stat }
                                </Text>
                            </View>
                        ))
                    }
                </View>

                {/* Final Sprite */}
                <View style={{marginBottom: 20, alignItems: 'center'}}>
                    <FadeInImage
                        uri={pokemon.sprites.front_default}
                        style={styles.basicSprites}
                    />
                </View>
            </View>
            {/* End of Stats */}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
    },
    title: {
        marginTop: 20,
        fontSize: 22,
        fontWeight: 'bold',
    },
    regularText: {
        fontSize: 19,
    },
    basicSprites: {
        width: 100,
        height: 100,
    }
})
