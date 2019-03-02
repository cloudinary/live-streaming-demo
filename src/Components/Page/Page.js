import React from 'react';

import {
    Col, Row,
} from 'reactstrap';

import './Page.css'

export default (props) => {
    return (
        <Row noGutters className="height-full">
            <Col md={10} lg={8} xl={6} className="offset-md-1 offset-lg-2 offset-xl-3 no-gutters">
                <div className="bg-blur"></div>
                <div className="bg-opacity">
                    {props.children}
                </div>
            </Col>
        </Row>
    );
}