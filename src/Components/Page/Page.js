import React from 'react';

import {
    Col, Row,
} from 'reactstrap';

import './Page.css'

export default ({className="", children, absolute}) => {
    if (absolute){
        return (
            <div noGutters className="h-100" style={{position:"absolute", boxSizing: "content-box", width:"110%"}}>
                <Col xs={12} className="w-100 h-100" style={{padding:0, margin:0}}>
                    <div className="bg-blur"></div>
                    <div className="bg-opacity">
                        {children}
                    </div>
                </Col>
            </div>
        );    
    }
    return (
        <Row noGutters className={"height-full "+className} style={absolute ? {position:"absolute"}: {}}>
            <Col md={10} lg={8} xl={6} className="offset-md-1 offset-lg-2 offset-xl-3 no-gutters">
                <div className="bg-blur"></div>
                <div className="bg-opacity">
                    {children}
                </div>
            </Col>
        </Row>
    );
}

/*

        return (
            <Row noGutters className={"height-full w-100"} style={{position:"absolute", boxSizing: "content-box", left:"2px"}}>
                <Col xs={12}>
                    <div className="bg-blur"></div>
                    <div className="bg-opacity">
                        {children}
                    </div>
                </Col>
            </Row>
        );    


*/