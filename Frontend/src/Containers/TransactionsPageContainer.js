import React from "react";
import {withRouter} from "react-router-dom";
import TransactionsPage from "../TransactionsPage";

const TransactionsPageContainer = withRouter((props)=>{
    return(<TransactionsPage history={props.history} store={props.store}/>)
});

export default TransactionsPageContainer;