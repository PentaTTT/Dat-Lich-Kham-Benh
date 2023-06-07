import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../utils';
import { FormattedMessage } from 'react-intl';
import { postVerifyBookAppointmentService } from '../../services/userService'
import HomeHeader from '../HomePage/HomeHeader';


class VerifyBooking extends Component {

    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0
        }
    }

    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            let res = await postVerifyBookAppointmentService({
                token: token,
                doctorId: doctorId
            })

            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode
                })
            } else {
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState) {

    }

    render() {
        let { statusVerify, errCode } = this.state

        return (
            <>
                <HomeHeader isShowBanner={false} />
                {statusVerify === false ?
                    <div
                        style={{
                            textAlign: 'center',
                            color: 'green',
                            fontSize: '20px',
                            paddingTop: '50px'
                        }}> Loading ....</div >
                    :
                    <div>
                        {errCode === 0 ?
                            <div style={{
                                textAlign: 'center',
                                color: 'green',
                                fontSize: '20px',
                                paddingTop: '50px'
                            }}>Xác nhận lịch hẹn thành công!</div>
                            :
                            <div style={{
                                textAlign: 'center',
                                color: 'red',
                                fontSize: '20px',
                                paddingTop: '50px'
                            }}>Lịch hẹn đã được xác nhận hoặc không tồn tại.</div>
                        }
                    </div>
                }
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyBooking);
