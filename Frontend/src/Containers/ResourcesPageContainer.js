import React from "react";
import {withRouter} from "react-router-dom";
import ResoursesPage from "../ResoursesPage";

const ResoursesPageContainer = withRouter((props)=>{
    return(<ResoursesPage history={props.history} store={props.store}/>)
});

export default ResoursesPageContainer;