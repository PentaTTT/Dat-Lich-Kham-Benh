import React, { Component } from 'react';
import { connect } from 'react-redux';

import Slider from "react-slick";
import specialtyImg from "../../../assets/handBook/handbook-1.png"

class HandBook extends Component {


    render() {

        return (
            <>
                <div className='section-share section-handBook'>
                    <div className='section-content'>
                        <div className='section-header'>
                            <span>Cảm nang</span>
                            <button>Xem thêm</button>
                        </div>

                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                                <div className=' specialty-customize'>
                                    <img src={specialtyImg} />
                                    <h4>Cẩm nang 1</h4>
                                </div>
                                <div className=' specialty-customize'>
                                    <img src={specialtyImg} />
                                    <h4>Cẩm nang 2</h4>
                                </div>
                                <div className=' specialty-customize'>
                                    <img src={specialtyImg} />
                                    <h4>Cẩm nang 3</h4>
                                </div>
                                <div className=' specialty-customize'>
                                    <img src={specialtyImg} />
                                    <h4>Cẩm nang 4</h4>
                                </div>
                                <div className=' specialty-customize'>
                                    <img src={specialtyImg} />
                                    <h4>Cẩm nang 5</h4>
                                </div>
                                <div className=' specialty-customize'>
                                    <img src={specialtyImg} />
                                    <h4>Cẩm nang 6</h4>
                                </div>
                                <div className=' specialty-customize'>
                                    <img src={specialtyImg} />
                                    <h4>Cẩm nang</h4>
                                </div>
                                <div className=' specialty-customize'>
                                    <img src={specialtyImg} />
                                    <h4>Cẩm nang</h4>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
