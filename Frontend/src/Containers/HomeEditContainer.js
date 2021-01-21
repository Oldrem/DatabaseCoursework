import React from "react";
import {withRouter} from "react-router-dom";
import HomePageEdit from "../HomePageEdit";

const HomeEditContainer = withRouter((props)=>{
    return(<HomePageEdit history={props.history} store={props.store}/>)
});

export default HomeEditContainer;
