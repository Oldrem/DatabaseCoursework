import React, { Component } from 'react';
import {connect} from "react-redux";
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';
import SuperTable from './SuperTable';

class transactions extends Component {

    constructor(props) {
        super(props);
        const transationsPerLoad = 20;
        this.state = {transactions: [], transactionCount: 0, 
            isLoading: true, isLoadingMore: false, 
            transationsLoaded: 0, transationsPerLoad: transationsPerLoad};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});
        fetch('api/transactions/amount')
            .then(response => response.json())
            .then(data => this.setState({transactionCount: data.amount}))
            .then( () => this.loadMore());
    }

    async remove(id) {
        await fetch(`/api/transaction/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedTransactions = [...this.state.transactions].filter(i => i.transactionId !== id);
            this.setState({transactions: updatedTransactions});
        });
    }

    async loadMore()
    {
        let newTransactionCount = this.state.transationsLoaded + this.state.transationsPerLoad;
        this.setState({isLoadingMore: true, transationsLoaded: newTransactionCount})
        await fetch('api/transactions/' + (this.state.transactionCount - newTransactionCount + 1) +'/' + (this.state.transactionCount))
            .then(response => response.json())
            .then(data => this.setState({transactions: data, isLoading: false, isLoadingMore: false}))
    }

    render() {
        const {transactions, isLoading} = this.state;

        if (isLoading) {
            return <LoadingScreen/>;
        }

        const rows = transactions.map(transaction => {
            return [
                transaction.colonyName,
                transaction.resourceName,
                transaction.transaction.amount,
                transaction.roomName,
                <ButtonGroup>
                            <Button to={"/transaction/" + transaction.transactionId}>Edit</Button>
                            <Button onClick={() => this.remove(transaction.transactionId)}>Delete</Button>
                </ButtonGroup>,
            ]
        });

        rows.reverse();

        const labels = [
            {name: "Traded with"},
            {name: "Resource"},
            {name: "Amount"},
            {name: "Taken from/put in"},
            {name: "Actions", class: "Shrink"},
        ];

        const addButton = <Button to="/transactions/new">Add transaction?</Button>;

        const loadMoreButton = this.state.isLoadingMore ? 
            <LoadingScreen/> :            
            <Button onClick={() => this.loadMore()}>Load {this.state.transationsPerLoad} more</Button> ;


        return (
            <div>
                <SuperTable title={"Our " + this.state.transationsLoaded + " latest machinations:"} 
                        labels={labels} rows={rows} addButton={addButton} enableSearch/>
                {loadMoreButton}    
            </div>       
        );
    }
}


export default transactions;
