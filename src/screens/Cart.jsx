import { StyleSheet, Text, View, FlatList, Pressable, ImageBackground } from 'react-native'

//import CartData from '../data/cart.json'
import CartItem from '../components/CartItem';
import { useSelector } from 'react-redux';
import { usePostOrderMutation } from '../services/shopServices';
import { Button } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from '../global/colors';
import { useToast } from 'native-base';


const Cart = () => {
  const { items: CartData, total } = useSelector((state) => state.cart.value)
  const [triggerPostOrder, result] = usePostOrderMutation()
  const { user } = useSelector((state) => state.auth.value);
  const toast = useToast();

  const onConfirmOrder = () => {
    // logica de confirmacion de orden
    triggerPostOrder({ items: CartData, user: user, total, createdAt: new Date().toISOString() })
    toast.show({
      description: "Orden confirmada", // Mensaje del toast
      duration: 3000, // Opcional: duración en milisegundos
      bg: colors.cyan00a2f9,
    });
  }

  return (
    <ImageBackground
      source={require('../../assets/churu_salmon.jpg')}
      style={styles.imageBackground}
    >
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.92)', 'rgba(255, 255, 255, 0.92)']}
        style={styles.linearGradient}
      >
        <View style={styles.container}>
          <FlatList
            data={CartData}
            renderItem={({ item }) => {
              return <CartItem cartItem={item} />;
            }}
            keyExtractor={(producto) => producto.id}
          />

          <View style={styles.confirmContainer}>
            <Button style={styles.confirmButton} onPress={onConfirmOrder}>
              <Text style={styles.confirmButtonText}>Confirmar Orden</Text>
            </Button>
          </View>

          <View style={styles.totalContainer}>
            <Text style={styles.totalText} >Total: $ {total}</Text>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

export default Cart

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  linearGradient: {
    flex: 1,
  },
  container: {
    justifyContent: "space-between",
    flex: 1,
    marginBottom: 100,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    top: 55
  },
  confirmContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    top: 55
  },
  confirmButton: {
    height: 50,
    width: 200,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.cyan00a2f9,
  },
  confirmButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.white
  },
  totalText: {
    fontSize: 33,
    fontFamily: "Cabin",
    color: colors.black,
    fontWeight: "bold"
  }
});
