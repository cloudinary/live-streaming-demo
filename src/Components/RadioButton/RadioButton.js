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
        <div className="pretty p-icon p-smooth p-round">
          <input
            type="radio"
            name={'social'}
            onChange={this.update}
            checked={checked}
            value={name}
          />
          <div className="state p-primary">
            <label htmlFor={name} className=" radio-label">
              
              <span className={`icon ${name}-icon`} />
              {label}

            </label>
          </div>
        </div>
      </Fragment>
    );
  }
};

export default inject('store')(observer(RadioButton));
