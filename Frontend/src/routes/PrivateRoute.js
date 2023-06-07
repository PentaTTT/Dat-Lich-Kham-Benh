import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { connect } from "react-redux";
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { USER_ROLE } from '../utils';

const PrivateRoute = (props) => {
    const location = useLocation();

    // const [isAdmin, setIsAdmin] = useState(false)

    // useEffect(() => {
    //     const { userInfo } = props;
    //     if (userInfo && !_.isEmpty(userInfo)) {
    //         let role = userInfo.roleId

    //         if (role === USER_ROLE.ADMIN) {
    //             setIsAdmin(true)
    //             console.log('check useEff', USER_ROLE.ADMIN)
    //         }
    //     }

    // }, [isAdmin])
    const { isAdmin } = props
    console.log('check isAdmin', isAdmin)
    if (isAdmin && isAdmin === true) {
        return (
            <Route path={props.path} component={props.component} />
        )
    } else {
        return (
            <Redirect
                to={{
                    pathname: "/system/user-manage",
                    state: { from: location }
                }}
            />
        )
    }
};

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


export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);