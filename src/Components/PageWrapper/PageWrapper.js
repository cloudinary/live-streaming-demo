import React from 'react';
import {Header, Footer} from '../Components';

/**
 * Wraps children with Header and Footer
 * @param children - Content to wrap
 * @return {*}
 */
export default ({children}) => {
  return (
    <React.Fragment>
      <Header/>
      {children}
      <Footer/>
    </React.Fragment>
  );
};
