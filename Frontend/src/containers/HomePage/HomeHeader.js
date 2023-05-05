import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import logo from '../../assets/images/logo.png';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions/appActions';
import { withRouter } from 'react-router'

class HomeHeader extends Component {

    //onclick
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
        //fire redux event: actions
    }

    handleReturnHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`)
        }
    }

    render() {
        let language = this.props.language;
        // console.log("check user info>>>>", this.props.userInfo)
        return (
            <>
                <div className='homeheader-container'>
                    <div className='header-content'>
                        <div className='header-content-left'>
                            <i className='fas fa-bars'></i>
                            <img className='header-logo' src={logo} onClick={() => this.handleReturnHome()} />
                            <div className='header-logo'></div>
                        </div>

                        <div className='header-content-center'>
                            <div className='child-content'>
                                <div><b> <FormattedMessage id="home-header.speciality" /> </b></div>
                                <div className='sub-title'><FormattedMessage id="home-header.search-doctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.health-facility" /></b></div>
                                <div className='sub-title'><FormattedMessage id="home-header.select-room" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.doctor" /></b></div>
                                <div className='sub-title'><FormattedMessage id="home-header.select-doctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.fee" /></b></div>
                                <div className='sub-title'><FormattedMessage id="home-header.health-check" /></div>
                            </div>
                        </div>

                        <div className='header-content-right'>
                            <div className='support'><i className='fas fa-question-circle'></i><FormattedMessage id="home-header.support" /></div>
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}>
                                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span>
                            </div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}>
                                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span>
                            </div>
                        </div>
                    </div >
                </div >

                {this.props.isShowBanner === true &&
                    <div className='header-banner'>
                        <div className='content-up'>
                            <div className='title'><FormattedMessage id="banner.title1" /></div>
                            <div className='sub-title'><FormattedMessage id="banner.title2" /></div>
                            <div className='search'>
                                <i className='fas fa-search'></i>
                                <input type="text" placeholder='Tìm chuyên khoa khám bệnh' />
                            </div>
                        </div>

                        <div className='content-down'>
                            <div className='options'>
                                <div className='option-child'>
                                    <div className='icon-option-child'>
                                        <i className='fas fa-hospital'></i>
                                    </div>
                                    <div className='text-option-child'><FormattedMessage id="banner.child1" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-option-child'>
                                        <i className='fas fa-mobile'></i>
                                    </div>
                                    <div className='text-option-child'><FormattedMessage id="banner.child2" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-option-child'>
                                        <i className='fas fa-procedures'></i>
                                    </div>
                                    <div className='text-option-child'><FormattedMessage id="banner.child3" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-option-child'>
                                        <i className='fas fa-flask'></i>
                                    </div>
                                    <div className='text-option-child'><FormattedMessage id="banner.child4" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-option-child'>
                                        <i className='fas fa-user-md'></i>
                                    </div>
                                    <div className='text-option-child'><FormattedMessage id="banner.child5" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-option-child'>
                                        <i className='fas fa-briefcase-medical'></i>
                                    </div>
                                    <div className='text-option-child'><FormattedMessage id="banner.child6" /></div>
                                </div>
                            </div>
                        </div>

                    </div>
                }
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
