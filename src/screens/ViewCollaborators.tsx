import { Body, Button, Icon, Left, ListItem, Text, Thumbnail, View, Footer } from "native-base";
import React, { useRef } from "react";
import { Animated, Dimensions, ScrollView, StyleSheet, TouchableHighlight, TouchableOpacity } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import Page from "../components/Page";
import Colors from "../helpers/Colors";
import useCollaborators from "../hooks/useCollaborators";
import usePagination from "../hooks/usePagination";
import User from "../model/User";

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

const ViewCollaborators = (props: any) => {
	const collaborators = useCollaborators();
	const scrollRef = useRef(null) as any;
	const { currentList, goBack, goForward, showGoBack, showGoForward } = usePagination(collaborators);

	const onChangePage = (callback: () => any) => () => {
		scrollRef.current.scrollTo({ x: 0, y: 0, animated: true });
		callback();
	};

	return (
		<Page title="Collaborators">
			<ScrollView style={{ flex: 1 }} ref={scrollRef}>
				<SwipeListView
					data={currentList}
					keyExtractor={(item) => `${item.id}-key-extractor`}
					renderItem={({ item }: { item: User }) => (
						<TouchableHighlight style={styles.rowFront} underlayColor={"#AAA"} key={`touch-item-${item.id}`}>
							<ListItem thumbnail>
								<Left>
									<Thumbnail
										source={{
											uri: item.photoUrl || "https://discovery-park.co.uk/wp-content/uploads/2017/06/avatar-default.png"
										}}
										small
									/>
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
				<Footer style={{ backgroundColor: Colors.light, marginVertical: 10 }}>
					<View style={{ flex: 1, backgroundColor: Colors.light, justifyContent: "space-around", flexDirection: "row" }}>
						<View>
							<Button disabled={!showGoBack} onPress={onChangePage(goBack)}>
								<Text>{"<"}</Text>
							</Button>
						</View>
						<View>
							<Button disabled={!showGoForward} onPress={onChangePage(goForward)}>
								<Text>{">"}</Text>
							</Button>
						</View>
					</View>
				</Footer>
			</ScrollView>
		</Page>
	);
};

export default ViewCollaborators;
