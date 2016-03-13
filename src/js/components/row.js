import React from 'react';

class Row extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div className="row">
                <i className="fa fa-cloud"></i>
                <i className="fa fa-tilde"></i>
                <span className="command">
                    Ciao
                    <span className="cursor">&nbsp;</span>
                </span>
            </div>
        );
    }
}

export default Row