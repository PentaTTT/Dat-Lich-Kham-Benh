import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";

import './Login.scss';
import { handleLogin } from '../../services/userService';
import { isBuffer } from 'lodash';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: '',
        }
    }

    //hàm handle event
    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
        console.log(event.target.value)
    }

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
        console.log(event.target.value)
    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })

        try {
            let data = await handleLogin(this.state.username, this.state.password)
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user);
                console.log('login success')
            }
        } catch (e) {
            if (e.response) {
                if (e.response.data) {

                    this.setState({
                        errMessage: e.response.data.message,
                    })
                }
            }
            // console.log(e)
        }
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    render() {

        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group input-login'>
                            <label>Username:</label>
                            <input type='text' placeholder='Enter your username' className='form-control'
                                value={this.state.username}
                                onChange={(event) => this.handleOnChangeUsername(event)} />
                        </div>
                        <div className='col-12 form-group input-login'>
                            <label>Password:</label>
                            <div className='custom-input-password'>
                                <input type={this.state.isShowPassword ? 'text' : 'password'} placeholder='Enter your password'
                                    className='form-control'
                                    onChange={(event) => this.handleOnChangePassword(event)} />
                                <span onClick={() => this.handleShowHidePassword()}>
                                    <i class={this.state.isShowPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
                                </span>
                            </div>
                        </div>

                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>

                        <div className='col-12'>
                            <button className='btn-login' onClick={() => this.handleLogin()}>Login</button>
                        </div>
                        <div className='col-12'>
                            <span className='forgot-password'>Forgot your password?</span>
                        </div>

                        <div className='col-12 text-center mt-3'>
                            <span className='text-other-login'>Or login with:</span>
                        </div>
                        <div className='col-12 social-login'>

                            <i class="fab fa-google google"></i>
                            <i class="fab fa-facebook-f facebook"></i>

                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
