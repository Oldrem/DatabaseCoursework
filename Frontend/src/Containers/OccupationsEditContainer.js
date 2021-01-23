import React from "react";
import {withRouter} from "react-router-dom";
import OccupationsEdit from "../OccupationsEdit";

const OccupationsEditContainer = withRouter((props)=>{
    return(<OccupationsEdit history={props.history} store={props.store}/>)
});


export default OccupationsEdit;
