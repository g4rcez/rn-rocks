import { useCallback, useEffect } from "react";
import useReducer from "./useReducer";

function paginate<T>(array: T[], itensPerView: number) {
	const chunked = [];
	for (let element of array) {
		const last = chunked[chunked.length - 1];
		if (!last || last.length === itensPerView) {
			chunked.push([element]);
		} else {
			last.push(element);
		}
	}
	return chunked;
}

const initialState = {
	currentPage: 0,
	paginateItens: [],
	showGoBack: false,
	showGoForward: false
};

type Actions = {
	pages: any[];
	showGoBack: boolean;
	showGoForward: boolean;
};
type State = typeof initialState;
const events = {
	goBack(state: State) {
		return { ...state, currentPage: state.currentPage - 1 };
	},
	goForward(state: State) {
		return { ...state, currentPage: state.currentPage + 1 };
	},
	renderUpdate(state: State, action: Actions) {
		return { ...state, paginateItens: action.pages, showGoBack: action.showGoBack, showGoForward: action.showGoForward };
	},
	setActions(state: State) {
		const showGoBack = state.currentPage >= 1;
		const showGoForward = state.currentPage < state.paginateItens.length;
		return { ...state, showGoBack, showGoForward };
	}
};

function usePagination<T>(itens: T[], itensPerView: number = 15) {
	const [state, dispatch] = useReducer(initialState, events);

	const goBack = useCallback(() => dispatch({ type: "goBack" }), []);

	const goForward = useCallback(() => dispatch({ type: "goForward" }), []);

	const greaterThanZero = itens.length > 0;

	useEffect(() => {
		if (greaterThanZero) {
			const pages = paginate(itens, itensPerView);
			const pagesSize = pages.length;
			const showGoBack = state.currentPage >= 1;
			const showGoForward = state.currentPage < pagesSize;
			dispatch({ type: "renderUpdate", pages, showGoBack, showGoForward });
		}
	}, [itens.length]);

	useEffect(() => {
		dispatch({ type: "setActions" });
	}, [state.currentPage]);

	const { currentPage } = state;

	return {
		goBack,
		goForward,
		currentPage,
		showGoBack: state.showGoBack,
		showGoForward: state.showGoForward,
		currentList: greaterThanZero ? state.paginateItens[currentPage] : []
	};
}

export default usePagination;
