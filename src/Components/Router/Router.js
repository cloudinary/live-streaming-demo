import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import posed, { PoseGroup } from 'react-pose';
import { MainPage, InvitePage } from '../Components';

const RoutesContainer = posed.div({
    enter: { opacity: 1, delay: 300 },
    exit: { opacity: 0 }
});

const Routes = ({ location }) => {
    return (
        <Switch location={location}>
            <Route exact path="/" component={MainPage} key="home" />
            <Route path="/invite" component={InvitePage} key="invite" />
        </Switch>
    );
};

export default () => {
    return (
        <BrowserRouter>
            <Route render={({ location }) => (
                <PoseGroup>
                    <RoutesContainer key={location.pathname + location.key}>
                        <Routes location={location} />
                    </RoutesContainer>
                </PoseGroup>
            )} />
        </BrowserRouter >
    );
}