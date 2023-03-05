import React, { Component } from 'react';
import { connect } from 'react-redux';

import Slider from "react-slick";

import doctorImg from "../../../assets/doctor/doctor-1.jpg"
class OutStandingDoctor extends Component {


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
                <div className='section-share section-outstandingDoctor'>
                    <div className='section-content'>
                        <div className='section-header'>
                            <span>Bác sĩ nổi bật tuần qua</span>
                            <button>Xem thêm</button>
                        </div>

                        <div className='section-body'>
                            <Slider {...settings}>
                                <div className='section-customize'>
                                    <div className='border-customize'>
                                        <div className='outer-bgImg'>
                                            <img src={doctorImg} />
                                        </div>
                                        <div className='position text-center'>
                                            <div>Giáo sư, Tiến sĩ Duy Tân</div>
                                            <div>Cơ xương khớp</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='section-customize'>
                                    <div className='border-customize'>
                                        <div className='outer-bgImg'>
                                            <img src={doctorImg} />
                                        </div>
                                        <div className='position text-center'>
                                            <div>Giáo sư, Tiến sĩ Duy Tân</div>
                                            <div>Cơ xương khớp</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='section-customize'>
                                    <div className='border-customize'>
                                        <div className='outer-bgImg'>
                                            <img src={doctorImg} />
                                        </div>
                                        <div className='position text-center'>
                                            <div>Giáo sư, Tiến sĩ Duy Tân</div>
                                            <div>Cơ xương khớp</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='section-customize'>
                                    <div className='border-customize'>
                                        <div className='outer-bgImg'>
                                            <img src={doctorImg} />
                                        </div>
                                        <div className='position text-center'>
                                            <div>Giáo sư, Tiến sĩ Duy Tân</div>
                                            <div>Cơ xương khớp</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='section-customize'>
                                    <div className='border-customize'>
                                        <div className='outer-bgImg'>
                                            <img src={doctorImg} />
                                        </div>
                                        <div className='position text-center'>
                                            <div>Giáo sư, Tiến sĩ Duy Tân</div>
                                            <div>Cơ xương khớp</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='section-customize'>
                                    <div className='border-customize'>
                                        <div className='outer-bgImg'>
                                            <img src={doctorImg} />
                                        </div>
                                        <div className='position text-center'>
                                            <div>Giáo sư, Tiến sĩ Duy Tân</div>
                                            <div>Cơ xương khớp</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='section-customize'>
                                    <div className='border-customize'>
                                        <div className='outer-bgImg'>
                                            <img src={doctorImg} />
                                        </div>
                                        <div className='position text-center'>
                                            <div>Giáo sư, Tiến sĩ Duy Tân</div>
                                            <div>Cơ xương khớp</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='section-customize'>
                                    <div className='border-customize'>
                                        <div className='outer-bgImg'>
                                            <img src={doctorImg} />
                                        </div>
                                        <div className='position text-center'>
                                            <div>Giáo sư, Tiến sĩ Duy Tân</div>
                                            <div>Cơ xương khớp</div>
                                        </div>
                                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
