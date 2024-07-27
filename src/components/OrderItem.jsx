import { StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "../global/colors";

const OrderItem = ({ order }) => {
  const total = order.items.reduce(
    (acc, currentItem) => (acc += currentItem.price * currentItem.quantity),
    0
  );

  const formatDate = (isoString) => {
    const [date, time] = isoString.split('T');
    const [hours, minutes, seconds] = time.split('.')[0].split(':');
    return `${date} - ${hours}:${minutes}:${seconds}`;
  };

  //Llamamos a la funcion para obtener la fecha formateada
  const formattedDate = formatDate(order.createdAt);

  return (
    <View style={styles.card} onPress={() => {}}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {formattedDate}
        </Text>
        <Text style={styles.text2}>${total}</Text>
      </View>
      <Feather name="search" size={30} color="black" paddingRight={25} />
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  card: {
    height: 100,
    backgroundColor: colors.redFFE5E5,
    padding: 10,
    margin: 10,
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    width: "70%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingLeft: 25,
  },
  text: {
    fontFamily: "Cabin",
    fontSize: 19,
    color: "black",
    marginBottom: 10
  },
  text2: {
    fontFamily: "Cabin",
    fontSize: 21,
    color: colors.black,
    fontWeight: "bold"
  },
});
