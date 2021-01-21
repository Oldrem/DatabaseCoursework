import React from "react";
import {withRouter} from "react-router-dom";
import WorkPage from "../WorkPage";

const WorkPageContainer = withRouter((props)=>{
    return(<WorkPage history={props.history} store={props.store}/>)
});

export default WorkPageContainer;
