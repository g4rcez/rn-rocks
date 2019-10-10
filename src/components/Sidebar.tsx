import { Container, Text, View, Button, Title, Footer } from "native-base";
import React from "react";
import Margin from "../helpers/Margin";
import Colors from "../helpers/Colors";
import Translate from "../helpers/Translate";
import { useNavigation } from "react-navigation-hooks";
import routes from "../screens/routes";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	button: {
		marginBottom: 5
	}
});

const Sidebar = (props: any) => {
	const { navigate } = useNavigation();

	const navigateToRoute = (route: string) => () => {
		navigate(route);
		props.onClose();
	};

	return (
		<Container style={{ flex: 1, backgroundColor: Colors.light, marginTop: Margin, justifyContent: "center" }}>
			<View style={{ paddingVertical: 15, marginHorizontal: 10 }}>
				<Title style={{ color: Colors["gray-dark"], textAlign: "left" }}>Qulture.Rocks</Title>
			</View>
			<View style={{ flex: 1, backgroundColor: Colors.light, marginHorizontal: 5 }}>
				<Button full block onPress={navigateToRoute(routes.Home)} style={styles.button}>
					<Text>{Translate("Collaborators")}</Text>
				</Button>
				<Button full block onPress={navigateToRoute(routes.AddCollaborator)} style={styles.button}>
					<Text>{Translate("NewCollaborator")}</Text>
				</Button>
			</View>
			<Footer style={{ backgroundColor: Colors.light }}>
				<Text>Footer</Text>
			</Footer>
		</Container>
	);
};

export default Sidebar;
