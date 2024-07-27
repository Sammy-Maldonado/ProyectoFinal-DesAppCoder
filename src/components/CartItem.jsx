import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Entypo } from "@expo/vector-icons";
import { colors } from '../global/colors';
import { useDispatch } from 'react-redux';
import { removeCartItem } from '../features/Cart/CartSlice';
import { useToast } from 'native-base';

const CartItem = ({ cartItem }) => {
  const dispatch = useDispatch();

  const toast = useToast();

  const handleRemove = () => {
    dispatch(removeCartItem({id: cartItem.id}));
    toast.show({
      description: "Producto eliminado del carrito", // Mensaje del toast
      duration: 3000, // Opcional: duración en milisegundos
      bg: colors.cyan00a2f9,
    });
  }

  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {cartItem.title}
        </Text>
        <Text style={styles.cartItemQuantity}>{`Cantidad: ${cartItem.quantity}`}</Text>
        <Text style={styles.cartItemPrice} >{`$ ${cartItem.price} c/u`}</Text>
      </View>
      <TouchableOpacity onPress={handleRemove}>
        <Entypo name="trash" size={30} color="black" paddingRight={25} />
      </TouchableOpacity>
    </View>
  );
}

export default CartItem

const styles = StyleSheet.create({
  card: {
    height: 160,
    backgroundColor: colors.redFFE5E5,
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
    marginHorizontal: 30
  },
  textContainer: {
    width: "70%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  text: {
    fontFamily: "Cabin",
    fontSize: 19,
    color: colors.black
  },
  cartItemQuantity: {
    fontFamily: "CabinBoldItalic",
    fontSize: 19,
    color: colors.black,
    marginTop: 5,
  },
  cartItemPrice: {
    fontFamily: "Cabin",
    fontSize: 22,
    color: colors.black,
    fontWeight: "bold",
    marginTop: 10,
  },
});
