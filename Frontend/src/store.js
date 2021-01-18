import { createStore} from 'redux';
import reducers from './reducers';
import middleware from "./middlewares";


const initialState = {
    appState:{
        user: window.localStorage.getItem("user"),
        points: [],
        drawing: []
    }
};

const store = createStore(reducers, initialState, middleware);

export default store;
