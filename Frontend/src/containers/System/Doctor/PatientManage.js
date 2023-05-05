import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './PatientManage.scss';
import DatePicker from '../../../components/Input/DatePicker';

class PatientManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date()
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState) {

    }

    //datepicker
    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    render() {

        return (
            <div className='patient-manage-container'>
                <div className='patient-manage-title title'>Quản lý bệnh nhân khám bệnh</div>
                <div className='patient-manage-body'>
                    <div className='col-4 form-group'>
                        <label>Chọn ngày</label>
                        <DatePicker
                            onChange={this.handleOnChangeDatePicker}
                            className='form-control'
                            value={this.state.currentDate[0]}
                        />
                    </div>

                    <div className='col-9 user-table mt-3 mb-5'>
                        <table id="TableManageUser">
                            <thead>
                                <tr>
                                    <th>Email</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Address</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>

                                <tr >
                                    <td>asdasdad</td>
                                    <td>asdadada</td>
                                    <td>dasdasdasda</td>
                                    <td>dasdadasda</td>
                                    <td>
                                        <button className='btn-edit'
                                        // onClick={() => this.handleEditUser(item)}
                                        >
                                            <i className='fas fa-pencil-alt'></i>
                                        </button>
                                        <button className='btn-delete'
                                        // onClick={() => this.handleDeleteUser(item)}
                                        >
                                            <i className='fas fa-trash'></i>
                                        </button>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(PatientManage);
