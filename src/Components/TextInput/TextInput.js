import React from 'react';
import { inject, observer } from 'mobx-react';
import { Input } from 'reactstrap';

const TextInput = class extends React.Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
  }

  update(e) {
    const { store, name, model } = this.props;
    store.setInputValue(name, `${e.target.value}`, model);
  }

  render() {
    const { store, name, model, className="input-orange"} = this.props;
    const element = model ? store[model].find(e=>e.label===name) : store[name];
    console.log('name: ', name, ' model:', model, ' element:', JSON.stringify(element));
    const {value} = element.value;
    const {placeholder} = model ? element.url : element;

    return (
        <input
          type="text"
          name={name}
          className={className}
          placeholder={placeholder}
          onChange={this.update}
          value={value}
        />
    );
  }
};

export default inject('store')(observer(TextInput));
