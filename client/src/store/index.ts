import {createStore} from 'vuex';
import type {StoreOptions} from 'vuex';

interface State {
    bgColor: string,
    lang: string,
}

const initialState: State = {
    bgColor: '#181818',
    lang: 'en',
}

const StoreOptions: StoreOptions<State> = {
    state: initialState,
    mutations: {
        setBGColor(state, color) {
            state.bgColor = color;
        },
        setLanguage(state, lang) {
            state.lang = lang;
        }
    }
}

const Store = createStore(StoreOptions);

export default Store;