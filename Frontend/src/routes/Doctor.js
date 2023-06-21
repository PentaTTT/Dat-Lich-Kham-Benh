import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import ScheduleManage from '../containers/System/Doctor/ScheduleManage';
import Header from '../containers/Header/Header';
import PatientManage from '../containers/System/Doctor/PatientManage';
import _ from 'lodash';
import { USER_ROLE } from '../utils';
import PrivateRouteDoctor from './PrivateRouteDoctor';
import UserManage from '../containers/System/UserManage';
import DoctorManage from '../containers/System/Admin/DoctorManage';

class Doctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDoctor: true,
        }
    }

    componentDidMount() {
        const { userInfo } = this.props;
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId
            if (role === USER_ROLE.DOCTOR) {
                this.setState({
                    isDoctor: true
                })
            }
        }
    }

    render() {
        const { isLoggedIn } = this.props;
        const { isDoctor } = this.state
        console.log('check isDoctor ', isDoctor)
        return (
            <>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/dashboard" component={UserManage} isDoctor={isDoctor} />
                            <Route path="/system/doctor-manage" component={DoctorManage} isDoctor={isDoctor} />
                            <PrivateRouteDoctor path='/doctor/schedule-manage' component={ScheduleManage} isDoctor={isDoctor} />
                            <PrivateRouteDoctor path='/doctor/patient-manage' component={PatientManage} isDoctor={isDoctor} />

                            <Route component={() => { return (<Redirect to='/doctor/schedule-manage' />) }} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
