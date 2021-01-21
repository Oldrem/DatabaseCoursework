import React from "react";
import {withRouter} from "react-router-dom";
import OccupationsPage from "../OccupationsPage";

const OccupationsPageContainer = withRouter((props)=>{
    return(<OccupationsPage history={props.history} store={props.store}/>)
});

export default OccupationsPageContainer;