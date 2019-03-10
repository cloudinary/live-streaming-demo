import React, { Fragment } from 'react';
import { inject, observer } from 'mobx-react';

const RadioButton = class extends React.Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
  }

  update(e) {
    const { store, action, name } = this.props;
    store[action](name);
  }

  render() {
    const { name, label, checked } = this.props;
    return (
      <Fragment>
          <input
            type="radio"
            name={'social'}
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
