import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParams } from '../navigation/navigator'

//This line helps me to handle the info through the navigation
interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {};

export default function PokemonScreen({ navigation, route }: Props) {

    const { simplePokemon, color } = route.params
    
    return (
        <View>
            <Text style={{ color }}>{simplePokemon.name} - {color}</Text>
        </View>
    )
}

const styles = StyleSheet.create({})
