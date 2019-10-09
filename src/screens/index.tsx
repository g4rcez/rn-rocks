import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import AddCollaborator from "./AddCollaborator";
import ViewCollaborators from "./ViewCollaborators";
import routes from "./routes";

const AppNavigator = createStackNavigator(
	{
		[routes.Home]: ViewCollaborators,
		[routes.AddCollaborator]: AddCollaborator
	},
	{
		initialRouteName: routes.AddCollaborator,
		headerMode: "none",
		navigationOptions: {
			headerVisible: false
		}
	}
);

export default createAppContainer(AppNavigator);
