import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserRedux from '../containers/System/Admin/UserRedux';
import Header from '../containers/Header/Header';
import DoctorManage from '../containers/System/Admin/DoctorManage';
import SpecialtyManage from '../containers/System/Specialty/SpecialtyManage';
import ClinicManage from '../containers/System/Clinic/ClinicManage';
import HandbookManage from '../containers/System/Admin/HandbookManage';
import _ from 'lodash';
import { USER_ROLE } from '../utils';
import PrivateRoute from './PrivateRoute';

class System extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAdmin: false,
        }
    }

    componentDidMount() {
        const { userInfo } = this.props;
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId
            if (role === USER_ROLE.ADMIN) {
                this.setState({
                    isAdmin: true
                })
            }
        }
    }

    render() {
        const { isLoggedIn } = this.props;
        const { isAdmin } = this.state
        console.log('check state', this.props.userInfo.roleId)
        return (
            <>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/dashboard" component={UserManage} />
                            <PrivateRoute path="/system/user-redux" component={UserRedux} isAdmin={isAdmin} />
                            <Route path="/system/doctor-manage" component={DoctorManage} />
                            <PrivateRoute path="/system/specialty-manage" component={SpecialtyManage} isAdmin={isAdmin} />
                            <PrivateRoute path="/system/clinic-manage" component={ClinicManage} isAdmin={isAdmin} />
                            <PrivateRoute path="/system/handbook-manage" component={HandbookManage} isAdmin={isAdmin} />

                            <Route component={() => { return (<Redirect to='/system/dashboard' />) }} />
                        </Switch>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
