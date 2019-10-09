import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import { Button, Content, Form, Input, Item, Label, Text } from "native-base";
import React, { useEffect, useState, useRef } from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import Page from "../components/Page";
import { createDateMask } from "../helpers/Mask";
import Translate from "../helpers/Translate";
import useReducer from "../hooks/useReducer";
import User from "../model/User";
import UserService from "../services/UserService";

const styles = StyleSheet.create({
	picture: {
		flex: 1
		// justifyContent: "center",
		// alignItems: "center"
	},
	pictureElements: {
		flex: 1,
		marginTop: 20
	}
});

const initialState = new User();
type State = typeof initialState;
type Actions = { field: keyof State; value: string };

const events = {
	onChange(state: State, action: Actions) {
		return { ...state, [action.field]: action.value };
	}
};

const AddCollaborator = (props: any) => {
	const [camState, setCamState] = useState({
		hasCameraPermission: null,
		type: Camera.Constants.Type.back
	});
	const [state, dispatch] = useReducer(initialState, events);

	const ref = useRef(null);

	useEffect(() => {
		console.log("REFERENCE", ref.current);
	}, [ref]);

	useEffect(() => {
		Permissions.askAsync(Permissions.CAMERA).then(() => {
			setCamState({ hasCameraPermission: status === "granted", type: Camera.Constants.Type.back });
		});
	}, []);

	const onChange = (field: keyof User) => (value: string) => dispatch({ type: "onChange", field, value });

	const dateMask = createDateMask(state.admissionDate);

	const submit = async () => {
		try {
			const response = UserService.createUser(state);
			console.log("USER", response);
		} catch (error) {
			console.log("deu ruim", error);
		}
	};

	return (
		<Page title="New Collaborator">
			<KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
				<Content style={{ flex: 1 }}>
					<View style={styles.picture}>
						{/* <Button transparent style={styles.pictureElements}> */}
						{/* <Thumbnail
								large
								circular
								source={{ uri: "https://discovery-park.co.uk/wp-content/uploads/2017/06/avatar-default.png" }}
							/> */}
						<Camera ref={ref} style={{ flex: 1, height: 450 }} type={camState.type}>
							<Text>Camera</Text>
						</Camera>
						{/* </Button> */}
						<View style={styles.pictureElements}>
							<Button onPress={() => console.log(ref)}>
								<Text>Add Picture</Text>
							</Button>
						</View>
					</View>
					<Form>
						<Item floatingLabel>
							<Label>{Translate("Name")}</Label>
							<Input onChangeText={onChange("name")} value={state.name} autoCapitalize="words" />
						</Item>
						<Item floatingLabel>
							<Label>{Translate("Email")}</Label>
							<Input onChangeText={onChange("email")} value={state.email} keyboardType="email-address" autoCapitalize="none" />
						</Item>
						<Item floatingLabel>
							<Label>{Translate("AdmissionDate")}</Label>
							<Input onChangeText={onChange("admissionDate")} value={dateMask} keyboardType="numeric" />
						</Item>
						<Item floatingLabel>
							<Label>{Translate("JobTitle")}</Label>
							<Input onChangeText={onChange("jobTitle")} value={state.jobTitle} autoCapitalize="words" />
						</Item>
						<View style={{ paddingHorizontal: 10, marginTop: 30 }}>
							<Button full primary active block onPress={submit}>
								<Text>{Translate("SaveButton")}</Text>
							</Button>
						</View>
					</Form>
				</Content>
			</KeyboardAvoidingView>
		</Page>
	);
};

export default AddCollaborator;
