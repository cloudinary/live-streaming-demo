import React from 'react';
import { Page } from '../Components';
import { Link } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import { Col, Container, Row, Button } from 'reactstrap';
import { ReactstrapInput, ReactstrapRadio } from 'reactstrap-formik';
import CloudUpload from '@material-ui/icons/CloudUpload';
import Slideshow from '@material-ui/icons/Slideshow';
import Vignette from '@material-ui/icons/Vignette';
import BlurOn from '@material-ui/icons/BlurOn';


import './MainPage.css';

const facebookLabel = () =>{
  return (
    <label htmlFor="facebook">
    <div className="icon facebook-icon"></div>
    <span>Facebook</span>
    </label>
  );
}

const youtubeLabel = () =>{
  return (
    <label htmlFor="youtube">
    <div className="icon youtube-icon"></div>
    <span>Youtube</span>
    </label>
  );
}

const ButtonToNavigate = ({
  history,
  values,
  to,
  type,
  children,
  doBefore
}) => {
  return (
    <Button
      color="primary"
      className="arrow"
      type={type}
      onClick={() => {
        if (doBefore) {
          doBefore(values);
        }
        history.push(to);
      }}
    >
      {children}
    </Button>
  );
};

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
    };
  }

  onNext() {
    this.props.updateStore(this.state);
  }

  render() {
    const doBefore = this.props.updateStore;
    return (
      <Page>
        <Formik
          initialValues={{ title: 'My live video', social: 'none' }}
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
            //console.log(values);
            //Make API calls here

            setTimeout(() => {
              setSubmitting(false);
              alert(
                `Submitted Successfully ->  ${JSON.stringify(values, null, 2)}`
              );
            }, 2000);
          }}
          render={({ submitForm, isSubmitting, values }) => (
            <Form>
              <Container style={{ paddingTop: '5px' }} className="text-white">
                <Row>
                  <Col xs="12">
                    <Field
                      label="Live streaming title"
                      placeholder="My live video"
                      name="title"
                      id="title"
                      component={ReactstrapInput}
                    />
                  </Col>
                  <Col xs="12">
                    <h4>Effects</h4>
                  </Col>
                  <Col xs="12">
                    <input type="checkbox" name="logo" value="logo"/>
                    <span style={{ marginLeft: '5px' }}><CloudUpload className="svg-icons"/>Add your logo</span>
                  </Col>
                  <Col xs="12">
                    <input type="checkbox" name="intro" value="intro" />
                    <span style={{ marginLeft: '5px' }}>
                    <Slideshow className="svg-icons"/>
                      Add intro animation
                    </span>
                  </Col>
                  <Col xs="12">
                    <input type="checkbox" name="border" value="border" />
                    <span style={{ marginLeft: '5px' }}>
                    <Vignette className="svg-icons"/>
                      Apply vignette border
                    </span>
                  </Col>
                  <Col xs="12">
                    <input type="checkbox" name="blur" value="blur" />
                    <span style={{ marginLeft: '5px' }}>
                    <BlurOn className="svg-icons"/>
                    Blur your video</span>
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
                    >aaa</Field>
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
                  <Col xs="12" >
                  <Row className="justify-content-center align-items-center">
                    <ButtonToNavigate
                      doBefore={doBefore}
                      values={values}
                      to="/invite"
                      type="submit"
                      history={this.props.history}
                    >
                      →
                    </ButtonToNavigate>
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
}
