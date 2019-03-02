import React from 'react';
import {Page} from '../Components';
import { Link } from "react-router-dom";
import {
    Container, Col, Row, Form,
    FormGroup, Label, Input,
    Button,
} from 'reactstrap';

import './InvitePage.css'

export default class InvitePage extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Page>
                <h1 className="whitecolor">Invite Page</h1>
                <Link to="/">Home</Link>
            </Page>
        );
    }
}