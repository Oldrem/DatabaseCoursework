import React from "react";
import {withRouter} from "react-router-dom";
import AnimalsEdit from "../AnimalsEdit";

const AnimalsEditContainer = withRouter((props)=>{
    return(<AnimalsEdit history={props.history} store={props.store}/>)
});


export default AnimalsEdit;
