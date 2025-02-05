import {StyleSheet, Text, View} from 'react-native';
import {useBarcelonaContext} from '../../store/context';

const Favotites = () => {
  const {favorites} = useBarcelonaContext();
  console.log(favorites);
  return (
    <View>
      <Text>Favotites</Text>
    </View>
  );
};

export default Favotites;

const styles = StyleSheet.create({});
