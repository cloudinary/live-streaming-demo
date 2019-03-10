import React from 'react';
import { Page, NavButton } from '../Components';
import { Field, Form, Formik } from 'formik';
import { Col, Container, Row } from 'reactstrap';
import { ReactstrapInput, ReactstrapRadio } from 'reactstrap-formik';
import CloudUpload from '@material-ui/icons/CloudUpload';
import Slideshow from '@material-ui/icons/Slideshow';
import Vignette from '@material-ui/icons/Vignette';
import BlurOn from '@material-ui/icons/BlurOn';
import { inject, observer } from 'mobx-react';
import Loader from 'react-loader-spinner';

import './MainPage.css';
import { Button } from '@material-ui/core';

const facebookLabel = () => {
  return (
    <label htmlFor="facebook">
      <div className="icon facebook-icon" />
      <span>Facebook</span>
    </label>
  );
};

const youtubeLabel = () => {
  return (
    <label htmlFor="youtube">
      <div className="icon youtube-icon" />
      <span>Youtube</span>
    </label>
  );
};

const MainPage = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showUploadLogoButton: false,
      logoUrl: null
    };

    this.renderUploadButton = this.renderUploadButton.bind(this);
    this.uploadToggle = this.uploadToggle.bind(this);
  }

  componentDidMount() {
    //this.props.store.setURL(null);
    this.props.store.initLiveStream();
  }

  uploadToggle() {
    this.setState(state => {
      return { showUploadLogoButton: !state.showUploadLogoButton };
    });
  }

  uploadLogoClick() {
    //cloudinary react upload widget
  }

  renderUploadButton() {
    if (!this.state.showUploadLogoButton) {
      return null;
    }

    return (
      <span>
        <Button className="bg-light">Upload</Button>
      </span>
    );
  }

  renderNavButton(values) {
    const { store, history } = this.props;
    if (store.error) {
      return null;
    }
    return (
      <NavButton
        cls="arrow"
        doBefore={store.updateStore}
        values={values}
        to="/invite"
        type="submit"
        history={history}
      >
        →
      </NavButton>
    );
  }

  renderLoading() {
    return (
      <Page>
        <Container className="h-100 text-white">
          <Row style={{ height: '100px  ' }} />
          <Row className="justify-content-center align-items-center">
            <Col mx={12} className="text-center">
              <Loader type="TailSpin" color="white" />
            </Col>
          </Row>
          <Row className="justify-content-center align-items-center">
            <Col mx={12} className="text-center">
              <h6>Initializing the live streaming session...</h6>
            </Col>
          </Row>
        </Container>
      </Page>
    );
  }

  renderError(error) {
    return (
      <Page>
        <Container className="h-100 text-white">
          <Row style={{ height: '100px  ' }} />
          <Row className="justify-content-center align-items-center">
            <Col mx={12} className="text-center">
              <h6>Error: {error}</h6>
            </Col>
          </Row>
        </Container>
      </Page>
    );
  }

  render() {
    const { store } = this.props;
    if (store.loading) {
      return this.renderLoading();
    }

    if (store.error) {
      return this.renderError(store.error);
    }

    return (
      <Page>
        <Formik
          initialValues={{ title: store.title, social: 'none' }}
          /*
          validate={values => {
            const errors = {};
            if (!values.title) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            return errors;
          }}
          
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setSubmitting(false);
              alert(
                `Submitted Successfully ->  ${JSON.stringify(values, null, 2)}`
              );
            }, 2000);
          }}
          */
          render={({ submitForm, isSubmitting, values }) => (
            <Form>
              <Container style={{ paddingTop: '5px' }} className="text-white">
                <Row>
                  <Col xs="12">
                    <Field
                      className="input-orange"
                      label="Live streaming title"
                      placeholder={store.title}
                      name="title"
                      id="title"
                      component={ReactstrapInput}
                    />
                  </Col>
                  <Col xs="12">
                    <h4>Effects</h4>
                  </Col>
                  <Col xs="12">
                  <Row>
                    <Col xs={6}>
                    <input
                      type="checkbox"
                      name="logo"
                      value="logo"
                      onChange={this.uploadToggle}
                    />
                        <span style={{ marginLeft: '5px' }}>
                          <CloudUpload className="svg-icons" />
                          Add your logo
                        </span>
                      </Col>
                      <Col xs={6}>{this.renderUploadButton()}</Col>
                      </Row>
                  </Col>
                  <Col xs="12">
                    <input type="checkbox" name="intro" value="intro" />
                    <span style={{ marginLeft: '5px' }}>
                      <Slideshow className="svg-icons" />
                      Add intro animation
                    </span>
                  </Col>
                  <Col xs="12">
                    <input type="checkbox" name="border" value="border" />
                    <span style={{ marginLeft: '5px' }}>
                      <Vignette className="svg-icons" />
                      Apply vignette border
                    </span>
                  </Col>
                  <Col xs="12">
                    <input type="checkbox" name="blur" value="blur" />
                    <span style={{ marginLeft: '5px' }}>
                      <BlurOn className="svg-icons" />
                      Blur your video
                    </span>
                    <hr />
                  </Col>
                  <Col xs="12">
                    <h4>Stream to social media</h4>
                  </Col>

                  <Col xs="12">
                    <Field
                      name="social"
                      component={ReactstrapRadio}
                      value="none"
                      type="radio"
                      label="None"
                      checked={true}
                    />
                  </Col>
                  <Col xs="12">
                    <Field
                      name="social"
                      component={ReactstrapRadio}
                      value="facebook"
                      type="radio"
                      label={facebookLabel()}
                    />
                  </Col>
                  <Col xs="12">
                    <Field
                      name="social"
                      component={ReactstrapRadio}
                      value="youtube"
                      type="radio"
                      label={youtubeLabel()}
                    />
                    <hr />
                  </Col>
                  <Col xs="12">
                    <Row className="justify-content-center align-items-center">
                      <p>{store.error}</p>
                    </Row>
                    <Row className="justify-content-center align-items-center">
                      {this.renderNavButton(values)}
                    </Row>
                  </Col>
                </Row>
              </Container>
            </Form>
          )}
        />
      </Page>
    );
  }
};

export default inject('store')(observer(MainPage));
