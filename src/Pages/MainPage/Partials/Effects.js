import React from 'react';
import { inject, observer } from 'mobx-react';
import { Row, Col } from 'reactstrap';
import { CheckBox, UploadWidget } from '../../../Components';
import '../../../../node_modules/pretty-checkbox/dist/pretty-checkbox.min.css'

const EffectList = inject('store')(
  observer(({ store }) => {
    return store.effects.map((e, i) => {
      return (
        <Row key={i}>
          <Col xs={12} key={i}>
            <CheckBox {...e.checkbox} />
          </Col>
        </Row>
      );
    });
  })
);

const isLogoEnabled = effects => {
  let e = effects.find(e => e.name == 'logo');
  return e.enabled;
};

const Effects = props => {
  const { store } = props;
  return (
    <Col xs={12} className="text-white">
      <Row>
        <Col xs={12}>
      <h4>Effects</h4>
      </Col>
      </Row>
      <Row>
      <Col xs={9} >
        <EffectList />
      </Col>
      <Col xs={3} ><div className="float-right">{isLogoEnabled(store.effects) ? <UploadWidget /> : null}</div></Col>
      </Row>
      <hr />
      </Col>
  );
};

export default inject('store')(observer(Effects));
