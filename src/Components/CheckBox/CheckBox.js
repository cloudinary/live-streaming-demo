import React from 'react';
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
      <div className="checkbox-flex">
        <label htmlFor={name} className="checkbox-label">
          <input
            id={name}
            type="checkbox"
            name={name}
            onChange={this.update}
            checked={checked}
          />
          <Icon name={logo} />
          {label}
        </label>
      </div>
    );
  }
};

export default inject('store')(observer(CheckBox));
