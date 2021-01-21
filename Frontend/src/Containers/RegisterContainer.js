import React from "react";
import {withRouter} from "react-router-dom";
import RegisterPage from "../RegisterPage";

const RegisterContainer = withRouter(({history})=>{
    return(<RegisterPage history={history}/>)
});


export default RegisterContainer;
