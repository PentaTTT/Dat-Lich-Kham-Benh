import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MedicalFacility.scss'

import Slider from "react-slick";

import medicalFacilityImg from "../../../assets/medicalFacility/co-so-1.jpeg"
class MedicalFacility extends Component {


    render() {
        let settings = {
            dots: false,
            infinity: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
        }

        return (
            <>
                <div className='section-share section-medicalFacility'>
                    <div className='section-content'>
                        <div className='section-header'>
                            <span>Cơ sở y tế nổi bật</span>
                            <button>Xem thêm</button>
                        </div>

                        <div className='section-body'>
                            <Slider {...settings}>
                                <div className='section-customize'>
                                    <img src={medicalFacilityImg} />
                                    <h5>Phòng khám Đa khoa Meditec</h5>
                                </div>
                                <div className='section-customize'>
                                    <img src={medicalFacilityImg} />
                                    <h5>Phòng khám Đa khoa Meditec</h5>
                                </div>
                                <div className='section-customize'>
                                    <img src={medicalFacilityImg} />
                                    <h5>Phòng khám Đa khoa Meditec</h5>
                                </div>
                                <div className='section-customize'>
                                    <img src={medicalFacilityImg} />
                                    <h5>Phòng khám Đa khoa Meditec</h5>
                                </div>
                                <div className='section-customize'>
                                    <img src={medicalFacilityImg} />
                                    <h5>Phòng khám Đa khoa Meditec</h5>
                                </div>
                                <div className='section-customize'>
                                    <img src={medicalFacilityImg} />
                                    <h5>Phòng khám Đa khoa Meditec</h5>
                                </div>
                                <div className='section-customize'>
                                    <h5>7</h5>
                                </div>
                                <div className='section-customize'>
                                    <h5>8</h5>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
