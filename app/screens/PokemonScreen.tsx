import React from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigation/navigator';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FadeInImage} from '../components/FadeInImage';
import {usePokemon} from '../hooks/usePokemon';
import {PokemonDetails} from '../components/PokemonDetails';

//This line helps me to handle the info through the navigation
interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

export default function PokemonScreen({navigation, route}: Props) {
  const { simplePokemon, color } = route.params;
  const { id, name, picture } = simplePokemon;
  const { top } = useSafeAreaInsets();

  //This custom hook provides me the complete information of every pokemon with his id
  const {isLoading, pokemon} = usePokemon(id);
  console.log(pokemon);

  return (
    <View style={{flex: 1}}>

      {/* Header Container */}
      <View style={{...styles.headerContainer, backgroundColor: color}}>

        {/* Button to go back */}
        <TouchableOpacity
          style={{...styles.backButton, top: top + 10}}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" color="white" size={35} />
        </TouchableOpacity>

        {/* Name of pokemon */}
        <Text style={{...styles.pokemonName, top: top + 45}}>
          {name + '\n'}#{id}
        </Text>

        {/* White Pokebola */}
        <Image
          source={require('../assets/pokebola-blanca.png')}
          style={styles.pokeball}
        />

        {/* Pokemon picture */}
        <FadeInImage uri={picture} style={styles.pokemonImage} />
      </View>
      {/* End Header Container */}

      {/* Details and loading */}
      {isLoading ? (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator color={color} size={50} />
        </View>
      ) : (
        <PokemonDetails pokemon={pokemon} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    zIndex: 999,
    height: 370,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  pokemonName: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    left: 20,
  },
  pokeball: {
    width: 250,
    height: 250,
    bottom: -21,
    opacity: 0.7,
  },
  pokemonImage: {
    width: 250,
    height: 250,
    position: 'absolute',
    bottom: -15,
  },
  loadingIndicator: {
    flex: 1,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
