import React from "react";
import {withRouter} from "react-router-dom";
import ResourcesEdit from "../ResourcesEdit";

const ResourcesEditContainer = withRouter((props)=>{
    return(<ResourcesEdit history={props.history} store={props.store}/>)
});


export default ResourcesEdit;
