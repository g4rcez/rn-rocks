import { Body, Button, Fab, Icon, Left, ListItem, Text, Thumbnail, View } from "native-base";
import React, { useState } from "react";
import { Animated, Dimensions, ScrollView, StyleSheet, TouchableHighlight, TouchableOpacity } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import Page from "../components/Page";
import Colors from "../helpers/Colors";
import useCollaborators from "../hooks/useCollaborators";
import User from "../model/User";

const Logo = require("../assets/logo.png");

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		flex: 1
	},
	standalone: {
		marginTop: 30,
		marginBottom: 30
	},
	standaloneRowFront: {
		alignItems: "center",
		backgroundColor: "#CCC",
		justifyContent: "center",
		height: 50
	},
	standaloneRowBack: {
		alignItems: "center",
		backgroundColor: Colors.green,
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 15
	},
	backTextWhite: {
		color: "#FFF"
	},
	rowFront: {
		color: Colors["gray-dark"],
		alignItems: "stretch",
		backgroundColor: "#fff",
		borderBottomColor: Colors.gray,
		borderBottomWidth: StyleSheet.hairlineWidth,
		justifyContent: "center",
		height: 54
	},
	rowBack: {
		alignItems: "center",
		backgroundColor: "#DDD",
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		paddingLeft: 15
	},
	backRightBtn: {
		alignItems: "center",
		bottom: 0,
		justifyContent: "center",
		position: "absolute",
		top: 0,
		width: 75
	},
	backRightBtnLeft: {
		color: Colors.cyan,
		right: 75
	},
	backRightBtnRight: {
		color: Colors.red,
		right: 0
	},
	controls: {
		alignItems: "center",
		marginBottom: 30
	},
	switchContainer: {
		flexDirection: "row",
		justifyContent: "center",
		marginBottom: 5
	},
	switch: {
		alignItems: "center",
		borderWidth: 1,
		borderColor: "black",
		paddingVertical: 10,
		width: Dimensions.get("window").width / 4
	},
	trash: {
		height: 25,
		width: 25
	}
});
const ViewCollaborators = () => {
	const [viewFab, setViewFab] = useState(false);
	const collaborators = useCollaborators();
	const changeView = () => setViewFab((previous) => !previous);

	return (
		<Page title="Collaborators">
			<ScrollView style={{ flex: 1 }}>
				<Text>Collaborators</Text>
				<SwipeListView
					keyExtractor={(item) => `${item.id}-key-extractor`}
					data={collaborators}
					renderItem={({ item }: { item: User }) => (
						<TouchableHighlight style={styles.rowFront} underlayColor={"#AAA"} key={`touch-item-${item.id}`}>
							<ListItem thumbnail>
								<Left>
									<Thumbnail source={{ uri: item.photoUrl }} small />
								</Left>
								<Body style={{ flex: 1, justifyContent: "flex-start" }}>
									<Text>{item.name}</Text>
									<Text note numberOfLines={1}>
										{item.jobTitle} - {item.email}
									</Text>
								</Body>
							</ListItem>
						</TouchableHighlight>
					)}
					renderHiddenItem={(data, rowMap) => (
						<View style={styles.rowBack}>
							<TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]}>
								<Icon type="AntDesign" name="edit" />
							</TouchableOpacity>
							<TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]}>
								<Animated.View style={[styles.trash]}>
									<Icon type="AntDesign" name="delete" />
								</Animated.View>
							</TouchableOpacity>
						</View>
					)}
					rightOpenValue={-150}
					previewRowKey={"0"}
					previewOpenValue={-40}
					previewOpenDelay={0}
				/>
			</ScrollView>
			<Fab direction="up" active={viewFab} onPress={changeView} position="bottomRight" style={{ backgroundColor: Colors.indigo }}>
				<Icon name="share" />
				<Button style={{ backgroundColor: Colors.green }}>
					<Icon name="person" />
				</Button>
			</Fab>
		</Page>
	);
};

export default ViewCollaborators;
