import React from 'react';
import { inject, observer } from 'mobx-react';
import { Icon } from '../Components';


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
    let iconName = label === 'None' ? "" : label.toLowerCase();
    return (
      <div className="checkbox-flex">
        <label htmlFor={name}  className="checkbox-label">
          <input
            type="radio"
            name={name}
            onChange={this.update}
            checked={checked}
            value={name}
          />
          <Icon name={iconName} text={label} fontAwesome={!!iconName}/>
          <span className="label">{label}</span>
        </label>
      </div>
    );
  }
};

export default inject('store')(observer(RadioButton));
