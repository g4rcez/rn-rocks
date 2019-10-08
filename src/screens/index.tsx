import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import ViewCollaborators from "./ViewCollaborators";

const AppNavigator = createStackNavigator(
	{
		Home: { screen: ViewCollaborators }
	},
	{
		initialRouteName: "Home",
		headerMode: "none",
		navigationOptions: {
			headerVisible: false
		}
	}
);

export default createAppContainer(AppNavigator);
