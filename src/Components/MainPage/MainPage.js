import React from 'react';
import {Page} from '../Components';
import { Link } from "react-router-dom";
import {
    Container, Col, Row, Form,
    FormGroup, Label, Input,
    Button,
} from 'reactstrap';

import './MainPage.css'

export default class MainPage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            title: 'My live video',
            effects: {
                logo: null,
                intro: null,
                border: null,
                blur: null
            },
            social: false
        }
    }

    render() {
        return (
            <Page>
                <h1 className="whitecolor">Main Page</h1>
                <Link to="/invite">Invite</Link>
            </Page>
        );
    }
}