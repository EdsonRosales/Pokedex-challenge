import React from 'react'
import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { usePokemonPaginated } from '../hooks/usePokemonPaginated';
import { styles } from '../theme/appTheme'

export default function HomeScreen() {

    const { top } = useSafeAreaInsets();
    const { simplePokemonList, loadPokemons } = usePokemonPaginated();

    return (
        <View>
            <Image 
                source={require('../assets/pokebola.png')}
                style={ styles.pokebolaBG }
            />

            <FlatList
                data={simplePokemonList}
                keyExtractor={ (pokemon) => pokemon.id }
                renderItem={ ({ item }) => (
                    <Image
                        source={{ uri: item.picture }}
                        style={{ height: 100, width: 100 }}
                    />
                )}

                //Infinite Scroll
                onEndReached={loadPokemons}
                onEndReachedThreshold={0.4}

                ListFooterComponent={(
                    <ActivityIndicator
                        style={{ height: 100 }}
                        size={20}
                        color='grey'
                    />
                )}
            />

            {/* <Text style={{
                ...styles.globalMargin,
                ...styles.title,
                top: top + 20,
            }}>Pokedex</Text> */}
        </View>
    )
}
