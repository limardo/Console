import React from 'react';
import Rows from './rows';

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this._onFocus = this._onFocus.bind(this);
    }

    componentDidMount() {
        document.addEventListener('focus', this._onFocus);
    }

    componentWillUnmount() {
        document.removeEventListener('focus', this._onFocus);
    }

    _onFocus(){
        var inputs = document.getElementsByTagName('input');
        inputs[inputs.length-1].focus();
    }

    render() {
        return <Rows />;
    }
}

export default Main;
