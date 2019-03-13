import React, { Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { Icon } from '../Components';

const CheckBox = class extends React.Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
  }

  update(e) {
    const { store, action, name } = this.props;
    store[action](name);
  }

  render() {
    const { name, label, logo, checked } = this.props;
    return (
      <Fragment>
        <input type="checkbox"
                  name={name}
                  onChange={this.update}
                  checked={checked}
         />
            <Icon name={logo}/>
            <label>{label}</label>
      </Fragment>
    );
  }
};

export default inject('store')(observer(CheckBox));
