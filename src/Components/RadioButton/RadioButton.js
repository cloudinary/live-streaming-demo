import React from 'react';
import {inject, observer} from 'mobx-react';
import {Icon} from '../Components';

class RadioButton extends React.Component {
  update = () => {
    const {store, action, label} = this.props;
    store[action](label);
  };

  render() {
    const {name, label, checked} = this.props;
    let iconName = label === 'None' ? "" : label.toLowerCase();
    return (
      <div className="checkbox-flex">
        <label htmlFor={name} className="checkbox-label">
          <input
            type="radio"
            name={name}
            onChange={this.update}
            checked={checked}
            value={name}
          />
          <Icon name={iconName}/>
          <span className="label">{label}</span>
        </label>
      </div>
    );
  }
}

export default inject('store')(observer(RadioButton));
