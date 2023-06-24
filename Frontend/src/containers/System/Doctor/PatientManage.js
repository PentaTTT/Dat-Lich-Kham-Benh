import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './PatientManage.scss';
import DatePicker from '../../../components/Input/DatePicker';
import {
    getListPatientService, getMedicalHistoryService,
    getAllListPatientService, getAllMedicalHistoryService,
    postSendRemedyService, postCancelStatusService,
    confirmBookingService, getListPatientByDateService
} from '../../../services/userService';
import RemedyModal from './RemedyModal';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';

class PatientManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date(),
            fromDate: '',
            toDate: '',
            dataPatient: [],
            dataHistory: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false,
            isShowTablePatient: true,
            isShowTableHistory: false,
            clickAll: false,
        }
    }

    async componentDidMount() {
        this.getDataPatient()
    }

    getDataPatient = async () => {
        let { user } = this.props
        let { fromDate, toDate } = this.state
        let formatDate = new Date(fromDate).toLocaleDateString().slice(0, 19).replace('T', ' ')
        let formatDate2 = new Date(toDate).toLocaleDateString().slice(0, 19).replace('T', ' ')

        let res = await getListPatientByDateService({
            doctorId: user.id,
            fromDate: formatDate,
            toDate: formatDate2
        })

        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }

        let history = await getMedicalHistoryService({
            doctorId: user.id,
            date: formatDate
        })

        if (history && history.errCode === 0) {
            this.setState({
                dataHistory: history.data
            })
        }
    }

    getAllDataPatient = async () => {
        let { user } = this.props

        let allPatient = await getAllListPatientService({
            doctorId: user.id
        })
        if (allPatient && allPatient.errCode === 0) {
            this.setState({
                dataPatient: allPatient.data
            })
        }
    }
    getAllDataHistory = async () => {
        let { user } = this.props

        let history = await getAllMedicalHistoryService({
            doctorId: user.id,
        })

        if (history && history.errCode === 0) {
            this.setState({
                dataHistory: history.data
            })
        }
    }

    async componentDidUpdate(prevProps, prevState) {

    }

    //datepicker
    handleOnChangeDatePicker = (date) => {
        this.setState({
            fromDate: date[0],
            clickAll: false
        }, async () => {
            await this.getDataPatient()
        })
    }
    handleOnChangeDatePicker2 = (date) => {
        this.setState({
            toDate: date[0],
            clickAll: false
        }, async () => {
            await this.getDataPatient()
        })
    }

    //send remedy btn
    handleSend = (item) => {
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

        if (this.state.clickAll === false) {
            await this.getDataPatient()
        } else {
            await this.getAllDataPatient()
            await this.getAllDataHistory()
        }
    }

    //cancel btn
    handleCancel = async (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            date: item.date,
            timeType: item.timeType,
        }

        await postCancelStatusService(data)

        await this.getDataPatient()
    }

    //confirm btn
    handleConfirm = async (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
        }
        await confirmBookingService(data)

        if (this.state.clickAll === false) {
            await this.getDataPatient()
        } else {
            await this.getAllDataPatient()
            await this.getAllDataHistory()
        }

    }

    handleClickPatientBtn = () => {
        this.setState({
            isShowTablePatient: true,
        })
        if (this.state.currentDate !== '') {
            this.setState({
                clickAll: false
            })
        }
    }
    handleClickHistoryBtn = () => {
        this.setState({
            isShowTablePatient: false,
        })
        if (this.state.currentDate !== '') {
            this.setState({
                clickAll: false
            })
        }
    }

    handleClickAllBtn = async () => {
        this.setState({
            clickAll: true,
            currentDate: ''
        })
        await this.getAllDataPatient()
        await this.getAllDataHistory()

    }

    render() {
        let { dataPatient, dataHistory, isOpenRemedyModal, dataModal, isShowTablePatient, clickAll } = this.state
        let { language } = this.props
        console.log('check dataPatient', dataPatient)
        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Send email...'
                >

                    <div className='patient-manage-container container'>
                        <div className='patient-manage-title title'>Quản lý bệnh nhân khám bệnh</div>
                        <div className='patient-manage-body'>
                            <div className='row px-4'>
                                <div className='col-2 form-group'>
                                    <label>Từ ngày</label>
                                    <DatePicker
                                        onChange={this.handleOnChangeDatePicker}
                                        className='form-control'
                                        value={this.state.fromDate}
                                    />
                                </div>
                                <div className='col-2 form-group'>
                                    <label>Đến ngày</label>
                                    <DatePicker
                                        onChange={this.handleOnChangeDatePicker2}
                                        className='form-control'
                                        value={this.state.toDate}
                                    />
                                </div>
                                <div className='col-2 all-list'>
                                    <button className={clickAll === false ? 'btn btn-outline-success px-2' : 'btn btn-success px-2'}
                                        onClick={() => { this.handleClickAllBtn() }}
                                    >Hiển thị tất cả ds</button>
                                </div>
                                <div className='button-control col-6'>
                                    <div style={{ float: 'right' }}>
                                        <button className={isShowTablePatient === true ? 'btn btn-success px-2 mx-2' : 'btn btn-outline-success px-2 mx-2'}
                                            onClick={() => { this.handleClickPatientBtn() }}
                                        >Danh sách lịch hẹn</button>
                                        <button className={isShowTablePatient === false ? 'btn btn-success px-2' : 'btn btn-outline-success px-2'}
                                            onClick={() => { this.handleClickHistoryBtn() }}
                                        >Lịch sử khám</button>

                                    </div>
                                </div>

                            </div>

                            {this.state.isShowTablePatient === true ?
                                <div className='col-12 user-table mt-3 mb-5'>
                                    <table id="TableManageUser">
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Trạng thái</th>
                                                <th>Họ tên</th>
                                                <th>Số điện thoại</th>
                                                <th>Giới tính</th>
                                                <th style={{ minWidth: '125px' }}>Thời gian khám</th>
                                                <th>Lý do khám</th>
                                                <th style={{ minWidth: '125px' }}>Hành động</th>
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
                                                            {item.statusId === 'S2' ?
                                                                <td className='text-primary'>Đã xác nhận</td>
                                                                :
                                                                <td className='text-warning'>Chờ xác nhận</td>}
                                                            <td>{item.patientData.lastName}</td>
                                                            <td>{item.patientData.phoneNumber}</td>
                                                            <td>{gender}</td>
                                                            <td>{time}</td>
                                                            <td>{item.reason}</td>
                                                            <td>
                                                                {item.statusId === 'S1' ?
                                                                    <>
                                                                        <button className='btn-confirm'
                                                                            onClick={() => this.handleConfirm(item)}
                                                                        >
                                                                            <i className='fa fa-check'></i>
                                                                        </button>

                                                                        <button className='btn-delete'
                                                                            onClick={() => this.handleCancel(item)}
                                                                        >
                                                                            <i className='fas fa-trash'></i>
                                                                        </button>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <button className='btn-edit'
                                                                            onClick={() => this.handleSend(item)}
                                                                        >
                                                                            <i className='fas fa-envelope'></i>
                                                                        </button>
                                                                        <button className='btn-delete'
                                                                            onClick={() => this.handleCancel(item)}
                                                                        >
                                                                            <i className='fas fa-trash'></i>
                                                                        </button>
                                                                    </>
                                                                }



                                                            </td>
                                                        </tr>
                                                    )
                                                })

                                                :
                                                <tr>
                                                    <td colSpan={8} style={{ textAlign: 'center' }}>
                                                        No data
                                                    </td>
                                                </tr>
                                            }

                                        </tbody>
                                    </table>
                                </div>
                                :
                                <div className='col-12 history-table mt-3'>
                                    <table id="TableHistory">
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Trạng thái</th>
                                                <th>Họ tên</th>
                                                <th>Email</th>
                                                <th>Giới tính</th>
                                                <th>Thời gian đặt</th>
                                                <th>Lý do khám</th>
                                                <th>Xóa lịch sử</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {dataHistory && dataHistory.length > 0 ?
                                                dataHistory.map((item, index) => {
                                                    let time = language === LANGUAGES.VI ?
                                                        item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn;
                                                    let gender = language === LANGUAGES.VI ?
                                                        item.patientData.genderData.valueVi : item.patientData.genderData.valueEn;
                                                    return (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            {item.statusId === 'S4' ? < td className='text-danger'>Đã hủy</td>
                                                                :
                                                                <td className='text-success'>Đã khám</td>}
                                                            <td>{item.patientData.lastName}</td>
                                                            <td>{item.patientData.email}</td>
                                                            <td>{gender}</td>
                                                            <td>{time}</td>
                                                            <td>{item.reason}</td>
                                                            <td>
                                                                {/* <button className='btn-edit'
                                                                    onClick={() => this.handleSend(item)}
                                                                >
                                                                    <i className='fa fa-check'></i>
                                                                </button> */}

                                                                <button className='btn-delete'
                                                                // onClick={() => this.handleDeleteUser(item)}
                                                                >
                                                                    <i className='fas fa-trash'></i>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })

                                                :
                                                <tr>
                                                    <td colSpan={8} style={{ textAlign: 'center' }}>
                                                        No data
                                                    </td>
                                                </tr>
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            }

                        </div>
                    </div>

                    <RemedyModal
                        isOpenModal={isOpenRemedyModal}
                        dataModal={dataModal}
                        closeRemedyModal={this.closeRemedyModal}
                        sendRemedyModal={this.sendRemedyModal}
                    />

                </LoadingOverlay >
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