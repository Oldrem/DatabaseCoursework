import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import {connect} from "react-redux";

class ReportPage extends Component {

    emptyReport = {
        userLogin: '',
        firstName: '',
        lastName: '',
        occupation: '',
        date: '',
        description: '',
        isReviewed: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            reportBody: this.emptyReport
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        let occupationId = this.props.match.params.occupationId;
        const colonist = await (await fetch('/api/colonist/' + this.props.user)).json();
        const occupation = await (await fetch('/api/occupation/' + occupationId)).json();
        JSON.stringify(colonist);
        JSON.stringify(occupation);
        let today = new Date(),
            date = today.getDate()+ '-' + (today.getMonth() + 1) + '-' + today.getFullYear() ;
        let report = {
            userLogin: this.props.user,
            firstName: colonist.firstName,
            lastName: colonist.lastName,
            occupation: occupation.name,
            date: date,
            description: '',
            isReviewed: 'false'
        };
        this.setState({reportBody : report});
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let reportBody = {...this.state.reportBody};
        reportBody[name] = value;
        this.setState({reportBody});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {reportBody} = this.state;

        await fetch('/api/report/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reportBody),
        });
        this.props.history.push('/work');
    }

    render() {
        const {reportBody} = this.state;

        return <div>
            <Container>
                <div className="main-wrapper"><div className="Wrapper2"><div className="main">
                    <h3>Форма отправки отчетности:</h3>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="firstName">
                            Имя: {reportBody.firstName}
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label for="lastName">
                            Фамилия: {reportBody.lastName}
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label for="occupation">
                            Работа: {reportBody.occupation}
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Подробный отчет за сегодняшний день:</Label><br/>
                        <Input type="textarea" name="description" id="report-description" value={reportBody.description || ''}
                               onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="date">
                            Дата: {reportBody.date}
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Отправить</Button>{' '}
                        <Link to={'/work'}><Button>Назад</Button></Link>
                    </FormGroup>
                </Form>
                </div></div></div>
            </Container>
        </div>
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.appState.user,
    }
};

export default connect(mapStateToProps)(ReportPage);
