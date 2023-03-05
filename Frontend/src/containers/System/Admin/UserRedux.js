import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions'

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: []
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        // try {
        //     let res = await getAllCodeService('gender');
        //     console.log('check data:', res)
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data
        //         })


        //     }
        // } catch (error) {
        //     console.log(error)
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.gender !== this.props.gender) {
            this.setState({
                genderArr: this.props.gender
            })
        }
    }


    render() {
        console.log('check props:', this.props.gender)
        let genders = this.state.genderArr
        let language = this.props.language
        return (
            <div className='user-redux-container'>
                <div className="title" ><FormattedMessage id="user-manage.add" /></div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'><FormattedMessage id="user-manage.add" /></div>
                            <div className='col-6'>
                                <label><FormattedMessage id="user-manage.email" /> </label>
                                <input className='form-control' type='email' />
                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id="user-manage.password" /> </label>
                                <input className='form-control' type='password' />
                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id="user-manage.firstName" /> </label>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id="user-manage.lastName" /> </label>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="user-manage.phoneNumber" /> </label>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id="user-manage.address" /> </label>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="user-manage.gender" /> </label>
                                <select className='form-control'>
                                    {
                                        genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option id={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }

                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="user-manage.position" /> </label>
                                <select className='form-control'>
                                    <option select>Chọn...</option>
                                    <option >...</option>
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="user-manage.roleId" /> </label>
                                <select className='form-control'>
                                    <option select>Chọn...</option>
                                    <option >...</option>
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="user-manage.image" /> </label>
                                <input className='form-control' type='text' />
                            </div>

                            <div className='col-12 mt-3'>
                                <button className='btn btn-primary px-2'><FormattedMessage id="user-manage.submit" /></button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        gender: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
        getGenderStart: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
