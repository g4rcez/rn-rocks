import { Body, Button, Header, Right, Left, Title, Icon } from "native-base";
import { Image } from "react-native";
import React from "react";
import Margin from "../helpers/Margin";
const Logo = require("../assets/logo.png");
type Props = {
	title: React.ReactNode;
	onOpen: () => any;
	onClose: () => any;
};

const NavHeader = (props: Props) => {
	return (
		<Header noShadow style={{ marginTop: Margin }}>
			<Left>
				<Image source={Logo} resizeMode="center" style={{ width: 28, height: 28 }} />
			</Left>
			<Body style={{ flex: 1, width: "100%" }}>
				<Title>{props.title}</Title>
			</Body>
			<Right>
				<Button transparent>
					<Icon name="menu" onPress={props.onOpen} />
				</Button>
			</Right>
		</Header>
	);
};

export default NavHeader;
