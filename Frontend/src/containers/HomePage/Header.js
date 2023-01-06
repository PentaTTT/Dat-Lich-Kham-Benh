import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Header.scss'


class Header extends Component {

    render() {
        return (
            <>
                <div className='header-container'>
                    <div className='header-content'>
                        <div className='header-content-left'>
                            <i className='fas fa-bars'></i>
                            <div className='header-logo'></div>
                        </div>

                        <div className='header-content-center'>
                            <div className='child-content'>
                                <div><b>Chuyên khoa</b></div>
                                <div className='sub-title'>Tìm bác sĩ theo chuyên khoa</div>
                            </div>
                            <div className='child-content'>
                                <div><b>Cơ sở y tế</b></div>
                                <div className='sub-title'>Chọn bệnh viên phòng khám</div>
                            </div>
                            <div className='child-content'>
                                <div><b>Bác sĩ</b></div>
                                <div className='sub-title'>Chọn bác sĩ giỏi</div>
                            </div>
                            <div className='child-content'>
                                <div><b>Gói khám</b></div>
                                <div className='sub-title'>Khám sức khỏe tổng quát</div>
                            </div>
                        </div>

                        <div className='header-content-right'>
                            <div className='support'><i className='fas fa-question-circle'></i>Hỗ trợ</div>
                            <div className='frag'>
                                VN
                            </div>
                        </div>
                    </div >
                </div >

                <div className='header-banner'>
                    <div className='content-up'>
                        <div className='title'>Nền tảng y tế</div>
                        <div className='sub-title'>Chăm sóc sức khỏe toàn diện</div>
                        <div className='search'>
                            <i className='fas fa-search'></i>
                            <input type='text' placeholder='Tìm chuyên khoa khám bệnh' />
                        </div>
                    </div>

                    <div className='content-down'>
                        <div className='options'>
                            <div className='option-child'>
                                <div className='icon-option-child'>
                                    <i className='fas fa-hospital'></i>
                                </div>
                                <div className='text-option-child'>Khám chuyên khoa</div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-option-child'>
                                    <i className='fas fa-mobile'></i>
                                </div>
                                <div className='text-option-child'>Khám từ xa</div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-option-child'>
                                    <i className='fas fa-procedures'></i>
                                </div>
                                <div className='text-option-child'>Khám tổng quát</div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-option-child'>
                                    <i className='fas fa-procedures'></i>
                                </div>
                                <div className='text-option-child'>Xét nghiệm y học</div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-option-child'>
                                    <i className='fas fa-procedures'></i>
                                </div>
                                <div className='text-option-child'>Sức khỏe tinh thần</div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-option-child'>
                                    <i className='fas fa-procedures'></i>
                                </div>
                                <div className='text-option-child'>Khám nha khoa</div>
                            </div>
                        </div>
                    </div>

                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
