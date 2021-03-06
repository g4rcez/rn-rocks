import { AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import React, { useEffect, useState } from "react";
import { StyleProvider } from "native-base";
import material from "./src/theme/variables/material";
import Screens from "./src/screens";
import getTheme from "./src/theme/components";

const App = () => {
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		console.ignoredYellowBox = ["Warning: Each", "Warning: Failed"];
		Font.loadAsync({
			Roboto: require("native-base/Fonts/Roboto.ttf"),
			Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
			...Ionicons.font,
			...AntDesign.font,
			...MaterialCommunityIcons.font,
			...MaterialIcons.font
		}).then(() => setLoading(false));
	}, []);
	if (loading) {
		return <AppLoading />;
	}
	return (
		<StyleProvider style={getTheme(material)}>
			<Screens />
		</StyleProvider>
	);
};

export default App;
