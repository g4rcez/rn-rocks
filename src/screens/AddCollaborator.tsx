import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { Button, Content, Form, Input, Item, Label, Text, Thumbnail } from "native-base";
import React, { useEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, StyleSheet, View } from "react-native";
import Page from "../components/Page";
import { createDateMask } from "../helpers/Mask";
import Translate from "../helpers/Translate";
import useReducer from "../hooks/useReducer";
import User from "../model/User";
import UserService from "../services/UserService";
import routes from "./routes";

const styles = StyleSheet.create({
	picture: { flex: 1, justifyContent: "center", marginTop: 20, alignItems: "center" }
});

const initialState = new User();
type State = typeof initialState;
type Actions = { field: keyof State; value: string };

const events = {
	onChange(state: State, action: Actions) {
		return { ...state, [action.field]: action.value };
	},
	clear() {
		return initialState;
	}
};

const AddCollaborator = (props: any) => {
	const [state, dispatch] = useReducer(initialState, events);
	const [loading, setLoading] = useState(false);
	const [image, setImage] = useState("https://discovery-park.co.uk/wp-content/uploads/2017/06/avatar-default.png");
	const goToHome = () => props.navigation.navigate(routes.Home);

	useEffect(() => {
		if (Constants.platform.ios) {
			Permissions.askAsync(Permissions.CAMERA_ROLL).then(({ status }) => {
				if (status !== "granted") {
					alert("Sorry, we need camera roll permissions to make this work!");
				}
			});
		}
	}, []);

	const onChange = (field: keyof User) => (value: string) => dispatch({ type: "onChange", field, value });

	const dateMask = createDateMask(state.admissionDate);

	const submit = async () => {
		setLoading(true);
		try {
			const response = await UserService.createUser({ ...state, photoUrl: image });
			setLoading(false);
			Alert.alert(Translate("SuccessOnSaveTitle"), Translate("SuccessOnSave")(response.name), [{ text: "OK", onPress: goToHome }], {
				cancelable: false
			});
			dispatch({ type: "clear" });
		} catch (error) {
			setLoading(false);
			console.log("deu ruim", error);
		}
	};

	const _pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			base64: true,
			exif: false,
			quality: 1
		});
		// console.log(result);
		if (!result.cancelled) {
			//@ts-ignore
			setImage(`data:image/gif;base64,${result!.base64}`);
		}
	};

	return (
		<Page title="New Collaborator">
			<KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
				<Content style={{ flex: 1 }}>
					<View style={styles.picture}>
						<Button transparent onPress={_pickImage}>
							<Thumbnail large circular source={{ uri: image }} />
						</Button>
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
							<Button full primary active block onPress={submit} disabled={loading}>
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
