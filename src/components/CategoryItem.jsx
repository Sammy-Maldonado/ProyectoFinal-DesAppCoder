import { StyleSheet, Text, Pressable, Image } from 'react-native'


import Card from './Card';
import { colors } from '../global/colors';

import { useDispatch, useSelector } from 'react-redux';
import { setCategorySelected } from '../features/Shop/ShopSlice';


const CategoryItem = ({ category, navigation}) => {
  const dispatch = useDispatch()

  const handleNavigate = () => {
    dispatch(setCategorySelected(category.name))
    navigation.navigate("ItemListCategory", { category: category.name });
  }

  return (
    <Card style={styles.cardContainer}>
      <Pressable onPress={handleNavigate}>
        <Image style={styles.image} source={{ uri: category.imageUrl }}  />
        <Text style={styles.text}>{category.name}</Text>
      </Pressable>
    </Card>
  );
};

export default CategoryItem

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10, 
        marginVertical: 20,
        height: 180,
        width: 200,
        backgroundColor: colors.redFFCCCC,
        borderRadius: 10,
    }, 
    text: {
        fontSize: 20,
        textAlign: 'center',
        color: colors.black
    },
    image: {
        height: 120,
        width: 200,
        marginBottom: 5,
    }
})
