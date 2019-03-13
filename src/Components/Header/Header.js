import React from 'react';
import { Col, Row } from 'reactstrap';
import { getHomeUrl } from '../../Utils/Routing';
import './Header.css';

const Header = (props) => {
    const homeUrl = getHomeUrl();
    return (
        <div className="header header-bg">
            <Row noGutters className="header">
                <Col md={10} lg={8} xl={6} className="offset-md-1 offset-lg-2 offset-xl-3 header-bg">
                <a style={{display:"block"}} href={homeUrl}>
                    <div className="header-grid align-items-center justify-content-center">
                        <div className="header-logo" />
                        <div className="header-text header-text-grid">
                            <div className="header-title">Cloudinary Live Streaming</div>
                            <div className="header-sub-title">Beta</div>
                        </div>
                    </div>
                    </a>
                </Col>
            </Row>
        </div>
    );
};

export default Header;

