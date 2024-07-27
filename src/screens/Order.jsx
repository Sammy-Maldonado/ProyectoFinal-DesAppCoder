import { StyleSheet, Text, View, FlatList, ImageBackground } from "react-native";
import ordenes from "../data/orders.json";

import OrderItem from "../components/OrderItem";
import { useGetOrdersByUserQuery } from "../services/shopServices";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from 'react-redux';



const Order = () => {
  const { user } = useSelector((state) => state.auth.value);
  const { data: OrderData, isLoading } = useGetOrdersByUserQuery(user);

  //if(!isLoading){
  //console.log(OrderData)
  //}

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
          <FlatList
            style={styles.orderFlatList}
            data={OrderData}
            //keyExtractor={(orderItem) => orderItem}
            renderItem={({ item }) => {
              return <OrderItem order={item} />;
            }}
          />
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default Order;

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
  orderFlatList: {
    paddingVertical: 30,
  },
});
