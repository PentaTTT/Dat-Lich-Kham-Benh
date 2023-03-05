import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss'

import Slider from "react-slick";
import specialtyImg from "../../../assets/specialty/co-xuong-khop.jpg"

class Specialty extends Component {


    render() {

        return (
            <>
                <div className='section-share section-specialty'>
                    <div className='section-content'>
                        <div className='section-header'>
                            <span>Chuyên khoa phổ biến</span>
                            <button>Xem thêm</button>
                        </div>

                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                                <div className=' specialty-customize'>
                                    <img src={specialtyImg} />
                                    <h4>Cơ xương khớp</h4>
                                </div>
                                <div className=' specialty-customize'>
                                    <img src={specialtyImg} />
                                    <h4>Cơ xương khớp</h4>
                                </div>
                                <div className=' specialty-customize'>
                                    <img src={specialtyImg} />
                                    <h4>Cơ xương khớp</h4>
                                </div>
                                <div className=' specialty-customize'>
                                    <img src={specialtyImg} />
                                    <h4>Cơ xương khớp</h4>
                                </div>
                                <div className=' specialty-customize'>
                                    <img src={specialtyImg} />
                                    <h4>Cơ xương khớp</h4>
                                </div>
                                <div className=' specialty-customize'>
                                    <img src={specialtyImg} />
                                    <h4>Cơ xương khớp</h4>
                                </div>
                                <div className=' specialty-customize'>
                                    <h4>7</h4>
                                </div>
                                <div className=' specialty-customize'>
                                    <h4>8</h4>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
