import React from 'react';
import { inject, observer } from 'mobx-react';
import { Row, Col } from 'reactstrap';
import { RadioButton, TextInput } from '../../../Components';

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
            <TextInput name={e.label} model="socials" className="input-orange social-input" type="text"/>
            </div>
            <p></p>
            <p className="text-small">{e.info}</p>
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
