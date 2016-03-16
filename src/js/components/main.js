import React from 'react';
import _ from 'lodash';
import Rows from './rows';

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return <Rows />;
    }
}

export default Main
