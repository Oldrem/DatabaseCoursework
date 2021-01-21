import React from "react";
import {withRouter} from "react-router-dom";
import ColoniesPage from "../ColoniesPage";

const ColoniesPageContainer = withRouter((props)=>{
    return(<ColoniesPage history={props.history} store={props.store}/>)
});

export default ColoniesPageContainer;