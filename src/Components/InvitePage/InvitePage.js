import React from 'react';
import { Page } from '../Components';
import { Link } from "react-router-dom";
import initLS from 'cloudinary-live-stream'

import {
    Container, Col, Row, Form,
    FormGroup, Label, Input,
    Button,
} from 'reactstrap';

import './InvitePage.css'

const CLD_API_HOST = "api.cloudinary.com";
const CLD_RES_HOST = "res.cloudinary.com";
const CLD_WEB_RTC_HOST = "webrtc-api.cloudinary.com";
const CLOUD_NAME = "demo-live";
const UPLOAD_PRESET = "live-stream";
const UPLOAD_PRESET_OPENER = "live-opener";
const CLOUD_NAME_IMAGES = CLOUD_NAME;
const UPLOAD_PRESET_IMAGES = "images";
const UPLOAD_WIDGET_PREFIX = "https://widget.cloudinary.com";
const UPLOAD_TYPE = "upload";

export default class InvitePage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            cloudName = CLOUD_NAME,
            uploadPreset = UPLOAD_PRESET,
        }
        this.liveStream = {};
        this.videoRef = React.createRef();
    }

    componentWillUnmount() {
        //destroy livestream
    }

    componentDidMount() {
        this.initLiveStream({...this.state});
    }

    startLiveStream(liveStream, publicId, url){
        this.liveStream = liveStream;
        this.liveStream.start(publicId);
    }

    // call initLiveStream with the configuration parameters:
    initLiveStream({cloudName, uploadPreset}) {
        let startLiveStream = this.startLiveStream;
        let liveStream;
        let video = this.videoRef.current;
        initLS({
            cloudName: cloudName,
            uploadPreset: uploadPreset,
            debug: "all",
            hlsTarget: true,
            fileTarget: true,
            events: {
                start: function (args) {
                    // user code
                },
                stop: function (args) {
                    // user code
                },
                error: function (error) {
                    // user code
                },
                local_stream: function (stream) {
                    // user code, typically attaching the stream to a video view:
                    liveStream.attach(video.get(0), stream);
                }
            }
        }).then((result) => {
            // keep handle to instance to start/stop streaming 
            liveStream = result;


            // Extract public id and url from result (publish the url for people to watch the stream):
            let publicId = result.response.public_id;
            let url = result.response.secure_url;

            // start the streaming:
            startLiveStream(liveStream, publicId, url);
        })
    }

    render() {
        return (
            <Page>
                <h1 className="whitecolor">Invite Page</h1>
                <p>{this.props.values.social}</p>
                <Link to="/">Home</Link>
            </Page>
        );
    }
}