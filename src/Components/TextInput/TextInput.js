import React from 'react';
import { inject, observer } from 'mobx-react';

/**
 * Text Input that updates store on change
 */
class TextInput extends React.Component {
  update = (e) => {
    const { store, name, model } = this.props;
    store.setInputValue(name, `${e.target.value}`, model);
  }

  render() {
    const { store, name, model, className="input-orange", defaultValue} = this.props;
    const element = model ? store[model].find(e=>e.label===name) : store[name];
    let placeholder = "";
    if (model || element){
      placeholder = model ? element.url.placeholder : element.placeholder;
    }

    const valueProp = defaultValue ? {defaultValue} : {value: element ? element.value : ""};

    return (
        <input
          type="text"
          name={name}
          className={className}
          placeholder={placeholder}
          onChange={defaultValue ? null :this.update}
          {...valueProp}
        />
    );
  }
}

export default inject('store')(observer(TextInput));
