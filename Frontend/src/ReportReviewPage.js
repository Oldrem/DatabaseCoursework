import React from "react";
import {connect} from "react-redux";
import {Button, ButtonGroup, FormGroup, Table} from "reactstrap";
import {Link} from "react-router-dom";

class ReportReviewPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {reports: [], isLoading: true};
        this.reviewReport = this.reviewReport.bind(this);
    }
    componentDidMount() {
        fetch('/api/reports/unreviewed')
            .then(response => response.json())
            .then(data => this.setState({reports: data, isLoading: false}))
            .catch(err => {console.error('Error:', err)});
    }

    async reviewReport(report) {
        report.reviewed = true;
        await fetch('/api/report/' + report.reportId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(report),
        }).then(() => {
            let updatedReports = [...this.state.reports].filter(i => i.reportId !== report.reportId);
            this.setState({reports: updatedReports});
        });
    }

    render() {
        const {reports, isLoading} = this.state;

        if (isLoading) {
            return(
                <div>
                    <p>Loading...</p>
                </div>
            ) ;
        }

        const reportList =
            reports.map(report => {
                return <tr key={report.reportId}>
                    <td style={{whiteSpace: 'nowrap'}}>{report.date}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{report.firstName}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{report.lastName}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{report.description}</td>
                    <td>
                        <ButtonGroup>
                            <Button size="sm" color="danger" onClick={() => this.reviewReport(report)}>Mark as
                                reviewed</Button>
                        </ButtonGroup>
                    </td>
                </tr>
        });

        let emptyMessage = "";
        if (reports.length === 0){
            emptyMessage = <p>Looks like there is no reports left. Great job!</p>;
        }

        return (
            <div className="main-wrapper">
                <div className="Wrapper2">
                    <div className="main">
                        <Table className="mt-4">
                            <thead>
                            <tr>
                                <th width="15%">Date</th>
                                <th width="15%">First Name</th>
                                <th width="15%">Last Name</th>
                                <th width="45%">Report description</th>
                            </tr>
                            </thead>
                            <tbody>
                            {reportList}
                            </tbody>
                        </Table>
                        {emptyMessage}
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

export default connect(mapStateToProps)(ReportReviewPage);
