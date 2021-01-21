import React from "react";
import {withRouter} from "react-router-dom";
import AnimalsPage from "../AnimalsPage";

const AnimalsPageContainer = withRouter((props)=>{
    return(<AnimalsPage history={props.history} store={props.store}/>)
});

export default AnimalsPageContainer;