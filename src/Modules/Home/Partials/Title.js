import React from 'react';
import { Col } from 'reactstrap';
import { TextInput } from '../../../Components';

const Title = () => {
  return (
    <Col xs="12" className="mb-20">
      <label className="text-white push-down">Live streaming title</label>
      <TextInput name="title" />
    </Col>
  );
};

export default Title;
