import React from "react";
import {withRouter} from "react-router-dom";
import NavigationBar from "../NavigationBar";

const NavigationBarContainer = withRouter((props)=>{
    return(<NavigationBar history={props.history} store={props.store}/>)
});

export default NavigationBarContainer;