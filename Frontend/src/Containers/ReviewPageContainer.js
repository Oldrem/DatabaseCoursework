import React from "react";
import {withRouter} from "react-router-dom";
import ReportReviewPage from "../ReportReviewPage";

const ReviewPageContainer = withRouter((props)=>{
    return(<ReportReviewPage history={props.history} store={props.store}/>)
});

export default ReviewPageContainer;
