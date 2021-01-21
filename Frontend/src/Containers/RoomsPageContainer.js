import React from "react";
import {withRouter} from "react-router-dom";
import RoomsPage from "../RoomsPage";

const RoomsPageContainer = withRouter((props)=>{
    return(<RoomsPage history={props.history} store={props.store}/>)
});

export default RoomsPageContainer;