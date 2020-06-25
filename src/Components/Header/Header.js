import React from 'react';
import {withRouter} from 'react-router-dom';
import {Col, Row} from 'reactstrap';
import {getHomeUrl} from '../../Utils/Routing';
import './Header.css';

const HeaderContainer = ({children, url}) => (
  <div className="header header-bg">
    <Row noGutters className="header">
      <Col md={10} lg={8} xl={6} className="offset-md-1 offset-lg-2 offset-xl-3 header-bg">
        <a style={{display: "block"}} href={url}>
          <div className="header-grid align-items-center justify-content-center">
            {children}
          </div>
        </a>
      </Col>
    </Row>
  </div>
);

const HeaderLogo = () => <div className="header-logo"/>;

const HeaderText = ({title, subTitle}) => (
  <div className="header-text header-text-grid">
    <div className="header-title">{title}</div>
    <div className="header-sub-title">{subTitle}</div>
  </div>
);

const Header = ({location}) => (
  <HeaderContainer url={getHomeUrl(location.pathname)}>
    <HeaderLogo/>
    <HeaderText title="Cloudinary Live Streaming" subTitle="Beta"/>
  </HeaderContainer>
);

export default withRouter(Header);
