import { createStore} from 'redux';
import reducers from './reducers';
import middleware from "./middlewares/middlewares";


const initialState = {
    appState:{
        user: window.localStorage.getItem("user"),
        roles: []
    },
    loginState:{
        login: "",
        password: "",
        error: false,
        formCorrect: false
    },
    registerState: {
        login: "",
        password: "",
        rPassword: "",
        loginError: false,
        passwordError: false,
        formCorrect: false
    }
};

const store = createStore(reducers, initialState, middleware);

export default store;
