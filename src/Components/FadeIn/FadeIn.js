import React from 'react';
import posed from 'react-pose';

const Box = posed.div({
    hidden: {opacity: 0},
    visible: { opacity: 1, delay: 300 }
});

const FadeIn = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isVisible: false};
        this.start = this.start.bind(this);
    }

    componentDidMount() {
        this.start();
    }

    componentDidUpdate() {
        this.start();
    }

    start() {
        if (this.props.start && !this.state.isVisible) {
            this.setState({isVisible: true});
        }
    }

    render() {
        const {children} = this.props;
        const {isVisible} = this.state;
        return <Box pose={isVisible ? 'visible' : 'hidden'}>{children}</Box>
    }
};

export default FadeIn;
