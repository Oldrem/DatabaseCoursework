import React from "react";
import {withRouter} from "react-router-dom";
import MainPage from "../HomePage";

const HomeContainer = withRouter((props)=>{
    return(<MainPage history={props.history} store={props.store}/>)
});

export default HomeContainer;
