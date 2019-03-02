import React, { Component } from 'react';
import styled from '@emotion/styled'
import { MainPage } from './Components';
import {
  Container, Col, Row, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';
import './App.css';

//background-color: #093068;
const StyledHeader = styled.div`
height:50px;
  width:100%;
  background-color: rgba(14,47,90,.8);
`;

const Footer = styled.div`
height:50px;
width:100%;
background-color: rgba(14,47,90);
`;

const Logo = styled.div`
height:50px;
background-color: rgba(14,47,90, .8);
width:100%;
padding:0;
margin:0;
`;

const Header = () => {
  return (
    <StyledHeader>
      <Row noGutters>
        <Col md={10} lg={8} xl={6} className="offset-md-1 offset-lg-2 offset-xl-3">
          <Logo>
            <h1 className="text-light">cloudinary</h1>
          </Logo>
        </Col>
      </Row>
    </StyledHeader>
  );
}

class App extends Component {
  render() {
    return (
      <div id="app" className="bg app-container">
        <Header />
        <MainPage></MainPage>
        <Footer />
      </div>
    );
  }
}

export default App;
