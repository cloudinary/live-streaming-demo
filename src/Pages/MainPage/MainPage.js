import React from 'react';
import { Page, NavButton, Spinner } from '../../Components';
import { Col, Row } from 'reactstrap';
import { inject, observer } from 'mobx-react';
import { Title, Effects, Social} from './Partials/Partials';
import './MainPage.css';

const ButtonNext = inject('store')(observer(({history, store}) =>{
  const error = store.error || '';
  return (
    <Col xs="12">
      <Row className="justify-content-center align-items-center">
        <p>{error}</p>
      </Row>
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
    if (store.loading) {
      return <Page><Spinner text="Initializing the live streaming session..."/></Page>;
    }

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
