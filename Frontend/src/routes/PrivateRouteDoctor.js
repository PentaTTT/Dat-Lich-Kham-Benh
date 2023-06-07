import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { connect } from "react-redux";
import _ from 'lodash';

const PrivateRouteDoctor = (props) => {
    const location = useLocation();

    const { isDoctor } = props
    console.log('check ạkasfjkafsjk', isDoctor)
    if (isDoctor && isDoctor === true) {
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


export default connect(mapStateToProps, mapDispatchToProps)(PrivateRouteDoctor);