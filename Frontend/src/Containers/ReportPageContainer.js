import React from "react";
import {withRouter} from "react-router-dom";
import ReportPage from "../ReportPage";

const ReportPageContainer = withRouter(({history})=>{
    return(<ReportPage history={history}/>)
});


export default ReportPage;
