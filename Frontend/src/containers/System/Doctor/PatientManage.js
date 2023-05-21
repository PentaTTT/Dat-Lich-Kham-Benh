import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './PatientManage.scss';
import DatePicker from '../../../components/Input/DatePicker';
import { getListPatientService, postSendRemedyService } from '../../../services/userService';
import moment from 'moment';
import RemedyModal from './RemedyModal';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';

class PatientManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date(),
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false,
        }
    }

    async componentDidMount() {

        this.getDataPatient()
    }

    getDataPatient = async () => {
        let { user } = this.props
        let { currentDate } = this.state
        let formatDate = new Date(currentDate).toLocaleDateString().slice(0, 19).replace('T', ' ')

        let res = await getListPatientService({
            doctorId: user.id,
            date: formatDate
        })

        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }

    async componentDidUpdate(prevProps, prevState) {

    }

    //datepicker
    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {
            await this.getDataPatient()
        })
    }

    //confirm btn
    handleConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.lastName
        }
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data
        })

        console.log('check dât', data)
    }

    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {}
        })
    }

    sendRemedyModal = async (dataFromModal) => {
        let { dataModal } = this.state
        this.setState({
            isShowLoading: true
        })
        let res = await postSendRemedyService({
            email: dataFromModal.email,
            imgBase64: dataFromModal.imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName
        });

        console.log('check res', res)
        if (res && res.errCode === 0) {
            this.setState({
                isShowLoading: false
            })
            toast.success('Send remedy success')
            await this.getDataPatient()
            this.closeRemedyModal()
        } else {
            this.setState({
                isShowLoading: false
            })
            toast.error('Send remedy error')
        }
    }

    render() {
        let { dataPatient, isOpenRemedyModal, dataModal } = this.state
        let { language } = this.props
        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Send email...'
                >

                    <div className='patient-manage-container'>
                        <div className='patient-manage-title title'>Quản lý bệnh nhân khám bệnh</div>
                        <div className='patient-manage-body'>
                            <div className='col-3 form-group'>
                                <label>Chọn ngày</label>
                                <DatePicker
                                    onChange={this.handleOnChangeDatePicker}
                                    className='form-control'
                                    value={this.state.currentDate}
                                />
                            </div>

                            <div className='col-9 user-table mt-3 mb-5'>
                                <table id="TableManageUser">
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Họ tên</th>
                                            <th>Email</th>
                                            <th>Giới tính</th>
                                            <th>Thời gian khám</th>
                                            <th>Lý do khám</th>
                                            <th>Xác nhận đã khám</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {dataPatient && dataPatient.length > 0 ?
                                            dataPatient.map((item, index) => {
                                                let time = language === LANGUAGES.VI ?
                                                    item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn;
                                                let gender = language === LANGUAGES.VI ?
                                                    item.patientData.genderData.valueVi : item.patientData.genderData.valueEn;
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.patientData.lastName}</td>
                                                        <td>{item.patientData.email}</td>
                                                        <td>{gender}</td>
                                                        <td>{time}</td>
                                                        <td>{item.reason}</td>
                                                        <td>
                                                            <button className='btn-edit'
                                                                onClick={() => this.handleConfirm(item)}
                                                            >
                                                                <i className='fa fa-check'></i>
                                                            </button>

                                                            {/* <button className='btn-delete'
                                                    // onClick={() => this.handleDeleteUser(item)}
                                                    >
                                                        <i className='fas fa-envelope'></i>
                                                    </button> */}
                                                        </td>
                                                    </tr>
                                                )
                                            })

                                            :
                                            <tr>
                                                <td colSpan={7} style={{ textAlign: 'center' }}>
                                                    No data
                                                </td>
                                            </tr>
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <RemedyModal
                        isOpenModal={isOpenRemedyModal}
                        dataModal={dataModal}
                        closeRemedyModal={this.closeRemedyModal}
                        sendRemedyModal={this.sendRemedyModal}
                    />

                </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientManage);
