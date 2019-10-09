import { useReducer, Dispatch } from "react";

type Action = { type: string; [key: string]: any };
type UseReducer<State, Types> = [State, Dispatch<{ type: Types; [key: string]: any }>];

const createReducer = <State>(reducer: { [key: string]: Function } & Object) => (state: State, action: Action): State => {
	const key = action.type;
	return reducer.hasOwnProperty(key) ? reducer[key](state, action) : state;
};

export default <S extends {}, T extends string>(state: S, fn: { [type in T]: (state: S, action: any) => S }): UseReducer<S, T> =>
	useReducer(createReducer<S>(fn), state, () => state);
