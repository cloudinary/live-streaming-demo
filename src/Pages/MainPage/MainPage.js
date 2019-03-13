import React from 'react';
import { Page, NavButton, Loader } from '../../Components';
import { Col, Row } from 'reactstrap';
import { inject, observer } from 'mobx-react';
import { Title, Effects, Social} from './Partials/Partials';
import './MainPage.css';

const ButtonNext = inject('store')(observer(({history, store}) =>{
  return (
    <Col xs="12" className="button-bottom">
      <Row className="justify-content-center align-items-center">
        <NavButton
          cls="arrow"
          to="/invite"
          history={history}
        >
          →
        </NavButton>
      </Row>
    </Col>
  );
}));

const MainPage = class extends React.Component {
  componentDidMount() {
    this.props.store.setStartedAtMainPage();
    if (this.props.store.needRestart){
      this.props.store.resetStore();
    }
  }

  render() {    
    return (
      <Page>
        <Title />
        <Effects />
        <Social />
        <ButtonNext {...this.props}/>
      </Page>
    );
  }
};

export default inject('store')(observer(MainPage));
