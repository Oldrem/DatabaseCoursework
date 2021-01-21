import React from "react";
import {connect} from "react-redux";

class LoginPage extends React.Component{
    render() {
        return(
            <div className="main-welcome">
                <h1>Добро пожаловать!</h1>
                <div className="login-form">
                    <span className="login">Логин:</span><br/>
                    <input type="text" value={this.props.login}
                           onChange={event => this.props.dispatch({
                               type: "LOGIN_SET_LOGIN",
                               value: event.target.value.replace(" ", "")})}/><br/>
                    <span className="login">Пароль:</span><br/>
                    <input type="password" value={this.props.password}
                           onChange={event => this.props.dispatch({
                               type: "LOGIN_SET_PASSWORD",
                               value: event.target.value})}/>
                    <br/>
                    <div className={!this.props.error? 'hidden' : 'warn'}>
                        Неверное имя пользователя или пароль!
                    </div>
                    <button className="submit-button" disabled={!this.props.formCorrect}
                            onClick={this.sendLoginRequest}>Войти</button>
                    <button className="submit-button" onClick={this.redirectToRegister}>Регистрация</button>
                </div>
            </div>
        )
    }
    sendLoginRequest = ()=>{
        this.props.dispatch({type:"APP_LOGIN", value:{history: this.props.history}})
    };

    redirectToRegister = ()=>{this.props.history.push("/register")};

}

const mapStateToProps = function(store) {
    return {
        user: store.appState.user,
        login: store.loginState.login,
        password: store.loginState.password,
        error: store.loginState.error,
        formCorrect: store.loginState.formCorrect
    }
};
export default connect(mapStateToProps)(LoginPage)
