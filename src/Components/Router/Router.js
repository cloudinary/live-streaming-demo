import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import posed, { PoseGroup } from 'react-pose';
import { MainPage, InvitePage } from '../Components';

const RoutesContainer = posed.div({
    enter: { opacity: 1, delay: 300 },
    exit: { opacity: 0 }
});

const Routes = ({ location, updateInvite, values }) => {
    return (
        <Switch location={location}>
            <Route exact path="/" render={(props) => <MainPage {...props} updateInvite={updateInvite}/>} key="home"/>
    <Route path="/invite" render={(props) => <InvitePage values={values}/>} key="invite" />
        </Switch>
    );
};

export default (props) => {
    return (
        <BrowserRouter>
            <Route render={({ location }) => (
                <PoseGroup>
                    <RoutesContainer key={location.pathname + location.key}>
                        <Routes location={location} {...props}/>
                    </RoutesContainer>
                </PoseGroup>
            )} />
        </BrowserRouter >
    );
}