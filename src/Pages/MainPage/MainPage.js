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
    this.props.store.initLiveStream();
  }

  render() {
    const { store } = this.props;
    const error = store.error || '';

    if (store.loading) {
      return <Page><Loader text="Initializing the live streaming session..."/></Page>;
    }

    return (
      <Page>
        <Title />
        <Effects />
        <Social />
        <Row className="justify-content-center align-items-center">
        <p>{error}</p>
      </Row>
        <ButtonNext {...this.props}/>
      </Page>
    );
  }
};

export default inject('store')(observer(MainPage));
