import { View, StyleSheet } from "react-native";

const Modal = ({ children }) => {
  return <View style={styles.modalContainer}>{children}</View>;
};

export default Modal;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#00001272",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 0.8,
  },
});
