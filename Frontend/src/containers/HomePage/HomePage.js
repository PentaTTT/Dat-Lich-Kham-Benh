import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import './HomePage.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import OutstandingDoctor from './Section/OutstandingDoctor';
import HandBook from './Section/HandBook';
import Footer from './Footer';
import About from './Section/About';

class HomePage extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 2,
        }

        return (
            <div>
                <HomeHeader isShowBanner={true} />
                <Specialty settings={settings} />
                <div style={{ height: '2px', backgroundColor: '#eee' }}></div>
                <MedicalFacility settings={settings} />
                <div style={{ height: '2px', backgroundColor: '#eee' }}></div>
                <OutstandingDoctor settings={settings} />
                <div style={{ height: '2px', backgroundColor: '#eee' }}></div>
                <HandBook settings={settings} />
                <div style={{ height: '2px', backgroundColor: '#eee' }}></div>
                <About />
                <div style={{ height: '2px', backgroundColor: '#eee' }}></div>
                <Footer />
            </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
