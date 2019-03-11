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
        <Col xs={6}>
          <RadioButton {...e.radio} />
          {showInput(e) && (
            <div>
              <input className="input-orange" type="text" />
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
