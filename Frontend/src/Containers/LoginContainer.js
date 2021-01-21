import React from "react";
import {withRouter} from "react-router-dom";
import LoginPage from "../LoginPage";


const LoginContainer = withRouter((props)=>{
    return(<LoginPage history={props.history}/>)
});

export default LoginContainer;
