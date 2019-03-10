import React from 'react';
import { inject, observer } from 'mobx-react';
import { Input } from 'reactstrap';

const TextInput = class extends React.Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
  }

  update(e) {
    const { store, name } = this.props;
    store.setInputValue(name, `${e.target.value}`);
  }

  render() {
    const { store, name } = this.props;
    const {value, placeholder} = store[name];
    return (
        <Input
          type="text"
          name={name}
          className="input-orange"
          placeholder={placeholder}
          onChange={this.update}
          value={value}
        />
    );
  }
};

export default inject('store')(observer(TextInput));
