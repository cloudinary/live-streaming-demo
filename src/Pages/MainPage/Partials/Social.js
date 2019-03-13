import React from 'react';
import { inject, observer } from 'mobx-react';
import { Row, Col, Button } from 'reactstrap';
import { RadioButton } from '../../../Components';

const showInput = radio => {
  return radio.label.toLowerCase() !== 'none' && radio.enabled;
};

const renderSocials = socials => {
  return socials.map((e, i) => {
    return (
      <Row key={i}>
        <Col xs={12}>
          <RadioButton {...e.radio} />
          {showInput(e) && (
            <div className="social-input-container">
            <div>
            <p className="text-medium">URL</p>
            </div>
            <div>
            <input className="input-orange social-input" type="text" placeholder="rtmp://"/>
            </div>
            <p></p>
            <p className="text-small">Enter the Server URL and Stream Key separated by a slash (/), available from the Facebook Create Live Stream page.</p>
            </div>
          )}
        </Col>
      </Row>
    );
  });
};

const Social = props => {
  const { store } = props;
  return (
    <Col xs={12} className="text-white">
      <h4>Stream to social media</h4>
      {renderSocials(store.socials)}
      <hr />
    </Col>
  );
};

export default inject('store')(observer(Social));
