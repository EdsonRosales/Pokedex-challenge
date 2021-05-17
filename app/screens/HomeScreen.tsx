import React from 'react'
import { View, Text, Image } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { usePokemonPaginated } from '../hooks/usePokemonPaginated';
import { styles } from '../theme/appTheme'

export default function HomeScreen() {

    const { top } = useSafeAreaInsets();
    usePokemonPaginated();

    return (
        <View>
            <Image 
                source={require('../assets/pokebola.png')}
                style={ styles.pokebolaBG }
            />
            <Text style={{
                ...styles.globalMargin,
                ...styles.title,
                top: top + 20,
            }}>Pokedex</Text>
        </View>
    )
}
