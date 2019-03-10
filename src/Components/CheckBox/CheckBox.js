import React, { Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { Icon } from '../Components';

const CheckBox = class extends React.Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
  }

  update(e) {
    const { store, action, name } = this.props;
    console.log("clicked:",action,name);
    store[action](name);
  }

  render() {
    const { name, label, logo, checked } = this.props;
    return (
      <Fragment>
      <div className="pretty p-icon p-smooth">
        <input type="checkbox"
                  name={name}
                  onChange={this.update}
                  checked={checked}
         />
        <div className="state p-primary">        
            <Icon className="icon mdi" name="Check"/>
            <label><Icon name={logo}/>
          {label}</label>
        </div>
    </div>
      </Fragment>
    );
  }
};

export default inject('store')(observer(CheckBox));
