import React, { Component } from 'react';
import { Button, Container, Table } from 'reactstrap';

class SuperTable extends Component 
{
    constructor(props)
    {
        super(props);
        this.setState({filter: props.search});
    }

    render() {
        
        let i = 0;
        const labels = this.props.labels.map(label => {
            return <th key={i++} className={label.class}>{label.name}</th>;
            }       
        )

        i = 0;
        const rows = this.props.rows.map(row => {
            let content = row.map(column => {
                return <td>{column}</td>
            });

            return <tr key={i++}>
                {content}
            </tr>
        });


        console.log(this.state.filter);

        const inputClass = this.props.enableSearch ? "" : "Hidden";

        return (
            <div>
                <Container fluid>
                    <div class="TableTitle">
                        <div><h2>{this.props.title}</h2></div>
                        <div>
                            filter: 
                            <input className={inputClass} type="text" 
                                value={this.state.filter}
                                onChange={value => this.setState({filter: value})}/>
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
