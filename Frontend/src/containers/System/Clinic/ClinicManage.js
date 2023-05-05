import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl'
import './ClinicManage.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import CommonUtils from '../../../utils/CommonUtils';
import { createClinicService } from '../../../services/userService';
import { toast } from 'react-toastify'

const mdParser = new MarkdownIt()

class ClinicManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            imgBase64: '',
            descriptionMarkdown: '',
            descriptionHTML: '',
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState) {

    }

    //onchange input
    handleOnchangeInput = (event, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = event.target.value
        this.setState({
            ...stateCopy
        })
    }

    // handle onchange markdown
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html,
        })

    }

    //handle preview image
    handleOnchangeImg = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            // let objectUrl = URL.createObjectURL(file);
            this.setState({
                // previewImgURL: objectUrl,
                imgBase64: base64
            })
        }
    }

    //save
    handleSaveClinic = async () => {
        let res = await createClinicService(this.state)
        if (res && res.errCode === 0) {
            toast.success('Add new specialty succeed!')
            this.setState({
                address: '',
                name: '',
                imgBase64: '',
                descriptionMarkdown: '',
                descriptionHTML: '',
            })
        } else {
            toast.error('Something wrong!')
            console.log(res)
        }
    }

    render() {
        console.log('check state: ', this.state)
        return (
            <div className='specialty-manage-container'>
                <div className='specialty-title title'>Quản lý phòng khám</div>
                <div className='specialty-content row'>
                    <div className='col-6 form-group'>
                        <label>Tên phòng khám</label>
                        <input className='form-control' type='text' value={this.state.name}
                            onChange={(event) => this.handleOnchangeInput(event, 'name')}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Ảnh phòng khám</label>
                        <input className='form-control-file' type='file'
                            onChange={(event) => this.handleOnchangeImg(event)}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Địa chỉ phòng khám</label>
                        <input className='form-control' type='text' value={this.state.address}
                            onChange={(event) => this.handleOnchangeInput(event, 'address')}
                        />
                    </div>
                    <div className='col-12'>
                        <MdEditor style={{ height: '400px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown} />

                    </div>

                    <div className='col-12'>
                        <button className='btn-add btn'
                            onClick={() => this.handleSaveClinic()}
                        >Save</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ClinicManage);
