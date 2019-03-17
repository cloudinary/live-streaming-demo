import React from 'react';
import { Header, Footer } from '../Components';

export default props => {
  return (
    <React.Fragment>
      <Header />
      {props.children}
      <div className="footer" />
    </React.Fragment>
  );
};
