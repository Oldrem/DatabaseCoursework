import React from "react";
import {withRouter} from "react-router-dom";
import ColoniesEdit from "../ColoniesEdit";

const ColoniesEditContainer = withRouter((props)=>{
    return(<ColoniesEdit history={props.history} store={props.store}/>)
});


export default ColoniesEdit;
