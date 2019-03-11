import React, { Fragment } from 'react';
import { inject, observer } from 'mobx-react';

const RadioButton = class extends React.Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
  }

  update(e) {
    const { store, action, label } = this.props;
    store[action](label);
  }

  render() {
    const { name, label, checked } = this.props;
    return (
      <Fragment>
          <input
            type="radio"
            name={name}
            onChange={this.update}
            checked={checked}
            value={name}
          />
            <label htmlFor={name} className="radio-label">
              
              <span className={`icon ${name}-icon`} />
              {label}

            </label>
      </Fragment>
    );
  }
};

export default inject('store')(observer(RadioButton));
