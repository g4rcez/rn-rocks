import { Container, Text } from "native-base";
import React from "react";
import Margin from "../helpers/Margin";

const Sidebar = (props: any) => {
	return (
		<Container style={{ flex: 1, backgroundColor: "#fff", marginTop: Margin, justifyContent: "center" }}>
			<Text>Qulture.Rocks</Text>
		</Container>
	);
};

export default Sidebar;
