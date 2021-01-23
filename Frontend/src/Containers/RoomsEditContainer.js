import React from "react";
import {withRouter} from "react-router-dom";
import RoomsEdit from "../RoomsEdit";

const RoomsEditContainer = withRouter((props)=>{
    return(<RoomsEdit history={props.history} store={props.store}/>)
});


export default RoomsEdit;
