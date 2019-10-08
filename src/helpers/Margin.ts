import Constants from "expo-constants";
import { Platform } from "react-native";

export default Platform.OS === "ios" ? 0 : Constants.statusBarHeight;
