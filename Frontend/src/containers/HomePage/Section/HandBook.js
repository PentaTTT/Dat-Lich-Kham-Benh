import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Handbook.scss'
import Slider from "react-slick";
import handbook from "../../../assets/handBook/handbook.jpg"
import handbook2 from "../../../assets/handBook/handbook2.jpg"
import handbook3 from "../../../assets/handBook/handbook3.jpg"
import handbook4 from "../../../assets/handBook/handbook4.jpg"
import { FormattedMessage } from 'react-intl';
import { Redirect, withRouter } from 'react-router-dom'

class HandBook extends Component {

    handleRedirect = () => {
        this.props.history.push('https://www.youtube.com/watch?v=aKsw4NoMoAs')
    }

    render() {

        return (
            <>
                <div className='section-share section-handBook'>
                    <div className='section-content'>
                        <div className='section-header'>
                            <span><FormattedMessage id='homepage.handbook' /></span>
                            <button><FormattedMessage id="homepage.more-info" /></button>
                        </div>

                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                                <div className=' specialty-customize'>
                                    <a target='_blank' href='https://fitobimbi.vn/ho-hap/tre-bi-ho/meo-tri-ho-cho-be-tai-nha/'>
                                        <img className='bg-image' src={handbook} />
                                        <h4>Trẻ bị ho về đêm</h4>
                                    </a>
                                </div>
                                <div className=' specialty-customize'>
                                    <a target='_blank' href='https://ivie.vn/tre-tuoi-bi-ho-va-non-ve-dem-nguyen-nhan-va-cach-xu-ly-0'>
                                        <img className='bg-image' src={handbook2} />
                                        <h4>Cách trị ho và nôn cho trẻ</h4>
                                    </a>
                                </div>
                                <div className=' specialty-customize'>
                                    <a target='_blank' href='https://ivie.vn/kham-tai-mui-hong-tai-benh-vien-giao-thong-van-tai-trung-uong-0' >
                                        <img className='bg-image' src={handbook3} />
                                        <h4>Khám tai mũi họng tại bệnh viện</h4>
                                    </a>
                                </div>
                                <div className=' specialty-customize'>
                                    <a target='_blank' href='https://ivie.vn/-bac-si-chua-viem-tai-giua-gioi-o-ha-noi-lich-kham-gia-kham-0'>
                                        <img className='bg-image' src={handbook4} />
                                        <h4>Top 9 bác sĩ tại Hà Nội</h4>
                                    </a>
                                </div>
                                <div className=' specialty-customize'>
                                    <a>
                                        <img className='bg-image' src={handbook4} />
                                        <h4>Cẩm nang 5</h4>
                                    </a>
                                </div>
                                <div className=' specialty-customize'>
                                    <a>
                                        <img className='bg-image' src={handbook4} />
                                        <h4>Cẩm nang 6</h4>
                                    </a>
                                </div>
                                <div className=' specialty-customize'>
                                    <a>
                                        <img className='bg-image' src={handbook4} />
                                        <h4>Cẩm nang 7</h4>
                                    </a>
                                </div>
                                <div className=' specialty-customize'>
                                    <a>
                                        <img className='bg-image' src={handbook4} />
                                        <h4>Cẩm nang 8</h4>
                                    </a>
                                </div>
                            </Slider>
                        </div>

                    </div>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HandBook));
