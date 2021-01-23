import React, { Component } from 'react';
import { Button, Container, Table } from 'reactstrap';

class SuperTable extends Component 
{
    constructor(props)
    {
        super(props);
        let filter = props.search ? props.search : "";
        this.state = {filter: filter};
    }

    render() {
        
        let i = 0;
        const labels = this.props.labels.map(label => {
            return <th key={i++} className={label.class}>{label.name}</th>;
            }       
        )

        const filter = this.state.filter;
        const isFilterUsed = filter.length > 0;

        i = 0;
        const rows = this.props.rows.map(row => {
            if (!isFilterUsed || row.toString().includes(filter))
            {
                let ii = 0;
                let content = row.map(column => {
                    return <td key={ii++}>{column}</td>
                });

                return <tr key={i++}>{content}</tr>;
            }
        });

        const inputClass = this.props.enableSearch ? "" : "Hidden";

        return (
            <div>
                <Container fluid>
                    <div className="TableTitle">
                        <div><h2>{this.props.title}</h2></div>
                        <div>
                            filter: 
                            <input className={inputClass} type="text" 
                                value={this.state.filter}
                                onChange={event => this.setState({filter: event.target.value})}/>
                            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            {this.props.addButton}
                        </div> 
                    </div>
                    <hr></hr>
                    <Table>
                        <thead>
                        <tr>
                            {labels}
                        </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default SuperTable;
