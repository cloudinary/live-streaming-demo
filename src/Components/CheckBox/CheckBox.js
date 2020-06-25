import React from 'react';
import { inject, observer } from 'mobx-react';
import { Icon } from '../Components';

/**
 *
 * @type {CheckBox}
 */
class CheckBox extends React.Component {
  update = () => {
    const { store, action, name } = this.props;
    store[action](name);
  };

  render() {
    const {update} = this;
    const { name, label, logo, checked } = this.props;

    return (
      <div className="checkbox-flex">
        <label htmlFor={name} className="checkbox-label">
          <input
            id={name}
            type="checkbox"
            name={name}
            onChange={update}
            checked={checked}
          />
          <Icon name={logo} />
          {label}
        </label>
      </div>
    );
  }
}

export default inject('store')(observer(CheckBox));
