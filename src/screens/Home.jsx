import React from "react";
import { StyleSheet, View, FlatList, ImageBackground } from "react-native";
import CategoryItem from "../components/CategoryItem";
import { colors } from "../global/colors";
import categories from "../data/categories.json";
import { useGetCategoriesQuery } from "../services/shopServices";
import { LinearGradient } from "expo-linear-gradient";

//import Counter from "../components/Counter";

const Home = ({ navigation, route }) => {
  const { data: categories } = useGetCategoriesQuery()
  //console.log(data)
  return (
    <ImageBackground
      source={require('../../assets/churu_salmon.jpg')}
      style={styles.imageBackground}
    >
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.92)', 'rgba(255, 255, 255, 0.92)']}
        style={styles.linearGradient}
      >
        <View style={styles.flatListContainer}>
          {/*       <Counter /> */}
          <FlatList
            style={styles.categoryFlatList}
            showsVerticalScrollIndicator={false}
            keyExtractor={(category) => category.name}
            data={categories}
            renderItem={({ item }) => (
              <CategoryItem category={item} navigation={navigation} />
            )}
          />
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default Home;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  linearGradient: {
    flex: 1,
  },
  flatListContainer: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  categoryFlatList: {
    paddingVertical: 30,
  },
});
