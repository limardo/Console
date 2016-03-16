import React from 'react';

class Output extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillUnmount() {
    }

    render() {
        var output = this.props.loading ? (<span className="cursor"></span>) : this.props.output;
        console.info(output, this.props.loading);
        return (
            <div className="output">
                <span className="command">{output}</span>
            </div>
        );
    }
}

export default Output