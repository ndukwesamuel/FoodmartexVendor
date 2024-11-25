import { BookATripSlice_reset } from "../../Redux/BookATripSlice";
import { reset_RouteSlice } from "../../Redux/Rider/RouteSlice";

export const ChangeRouteFun = (dispatch, navigation) => {
  dispatch(reset_RouteSlice());
  dispatch(BookATripSlice_reset());
  navigation.navigate("Home");
};
