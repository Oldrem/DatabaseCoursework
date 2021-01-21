import React from "react";
import {connect} from "react-redux";

class RegisterPage extends React.Component{
    render() {
        return(
            <div className="main-welcome">
                <h1>Регистрация</h1>
                <div className="login-form">
                <span className="login">Логин</span><br/>
                <input type="text" value={this.props.login}
                       onChange={event => this.props.dispatch({
                           type: "REGISTER_SET_LOGIN",
                           value: event.target.value.replace(" ", "")})}/><br/>
                <div className={!this.props.loginError? 'hidden' : 'warn'}>
                    Пользователь с таким именем уже существует
                </div>
                <span className="login">Пароль</span><br/>
                <input type="password" value={this.props.password}
                       onChange={event => this.props.dispatch({
                           type:"REGISTER_SET_PASSWORD",
                           value: event.target.value})}/><br/>
                <span className="login">Повторите пароль</span><br/>
                <input type="password" value={this.props.rPassword}
                       onChange={event => this.props.dispatch({
                           type:"REGISTER_SET_R_PASSWORD",
                           value: event.target.value})}/><br/>
                <div className={!this.props.passwordError? 'hidden' : 'warn'}>
                    Пароли не совпадают
                </div>
                <button className="submit-button" onClick={this.register} disabled={!this.props.formCorrect}>Регистрация</button>
                <button className="submit-button" onClick={this.redirectToLogin}>Назад</button>
                </div>
            </div>
        )
    }
    redirectToLogin = ()=>{this.props.history.push("/login")};

    register = ()=>{
       this.props.dispatch({type: "APP_REGISTER", value:{history: this.props.history}})
    };
}

const mapStateToProps = function(store) {
    return {
        user: store.appState.user,
        login: store.registerState.login,
        password: store.registerState.password,
        rPassword: store.registerState.rPassword,
        passwordError: store.registerState.passwordError,
        loginError: store.registerState.loginError,
        formCorrect: store.registerState.formCorrect
    }
};

export default connect(mapStateToProps)(RegisterPage);
