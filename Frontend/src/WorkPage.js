import React from "react";
import {connect} from "react-redux";
import {Button, ButtonGroup, FormGroup, Table} from "reactstrap";
import {Link} from "react-router-dom";

class WorkPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {occupations: [], reports: [], isLoading: true};
    }
    componentDidMount() {
        /*fetch('user/' + this.props.user)
            .then(response => response.json())
            .then(data => this.setState({role: data}))
            .catch(err => {console.error('Error:', err)});*/
        fetch('/api/colonistlogin/' + this.props.user + '/occupations')
            .then(response => response.json())
            .then(data => this.setState({occupations: data}))
            .catch(err => {console.error('Error:', err)});
        fetch('/api/reports/' + this.props.user)
            .then(response => response.json())
            .then(data => this.setState({reports: data, isLoading: false}))
            .catch(err => {console.error('Error:', err)});
    }

    render() {
        const {occupations, reports, isLoading} = this.state;

        if (isLoading) {
            return(
                <div>
                    <p>Loading...</p>
                </div>
            ) ;
        }

        const occupationList = occupations.map(occupation => {
            if (occupation.timeStarts === "null") {
                return <div key={occupation.occupationId}>
                    <p>Работа: {occupation.name}</p>
                    <p>Время начала: {occupation.timeStarts}</p>
                    <p>Время окончания: {occupation.timeEnds}</p>
                    <p>Описание: {occupation.description}</p>
                    <p><Link to={'/report/' + occupation.occupationId}><Button >Отправить отчетность.</Button></Link></p>
                </div>
            }
            else {
                return <div key={occupation.occupationId}>
                    <p>Работа: {occupation.name}</p>
                    <p>Время: Конкретное расписание отсутствует</p>
                    <p>Описание: {occupation.description}</p>
                    <p><Link to={'/report/' + occupation.occupationId}><Button >Отправить отчетность.</Button></Link></p>
                </div>
            }
        });

        const reportList = reports.map(report => {
            JSON.stringify(reports);
            console.log(reports);
            if (report.isReviewed) {
                return  <tr key={report.reportId}>
                    <td style={{whiteSpace: 'nowrap'}}>{report.description}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{report.date}</td>
                    <td style={{whiteSpace: 'nowrap'}}>Reviewed!</td>
                </tr>
            }
            else {
                return <tr key={report.reportId}>
                    <td style={{whiteSpace: 'nowrap'}}>{report.description}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{report.date}</td>
                    <td style={{whiteSpace: 'nowrap'}}>In progress</td>
                </tr>
            }
        });

        return (
            <div className="main-wrapper">
                <div className="Wrapper2">
                    <div className="main">
                        {occupationList}
                        <Table className="mt-4">
                            <thead>
                            <tr>
                                <th width="45%">Report description</th>
                                <th width="15%">Date</th>
                                <th width="15%">State</th>

                            </tr>
                            </thead>
                            <tbody>
                                {reportList}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.appState.user,
    }
};

export default connect(mapStateToProps)(WorkPage);
