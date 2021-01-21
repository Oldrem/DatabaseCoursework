import React from "react";
import {withRouter} from "react-router-dom";
import Colonists from "../ColonistsPage";

const ColonistsContainer = withRouter((props)=>{
    return(<Colonists history={props.history} store={props.store}/>)
});

export default ColonistsContainer;
