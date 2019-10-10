import { Container, Drawer } from "native-base";
import { View } from "react-native";
import React, { useRef, useEffect } from "react";
import NavHeader from "./NavHeader";
import Sidebar from "./Sidebar";

type Props = {
	children: React.ReactNode;
	title: React.ReactNode;
};

const Page = ({ children, title, ...props }: Props) => {
	const ref = useRef(null);

	const closeDrawer = () => ref.current._root.close();
	const openDrawer = () => ref.current._root.open();

	return (
		<Drawer side="right" ref={ref} content={<Sidebar onClose={closeDrawer} />} onClose={closeDrawer}>
			<Container>
				<NavHeader title={title} onClose={closeDrawer} onOpen={openDrawer} />
				<View style={{ flex: 1 }}>{children}</View>
			</Container>
		</Drawer>
	);
};

export default Page;
