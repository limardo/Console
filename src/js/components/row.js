import $ from 'jquery';
import React from 'react';

class Row extends React.Component {

    constructor(props) {
        super(props);
        this.state = {command: ''};
        this.handleKeydown = this.handleKeydown.bind(this);
    }

    componentDidMount() {
        $(document).bind('keypress', this.handleKeydown);
    }

    componentWillUnmount() {
        $(document).unbind('keypress', this.handleKeydown);
    }

    handleKeydown(e) {
        var command = this.state.command;

        if (e.which === 13) {
            console.info('Invio');
        } else if (e.which === 8) {
            command = command.substring(0, command.length - 1);
        } else {
            command += e.key;
        }

        this.setState({command});
    }

    render() {
        return (
            <div className="row">
                <i className="fa fa-cloud"></i>
                <i className="fa fa-tilde"></i>
                <span className="command">
                    {this.state.command}
                    <span className="cursor">&nbsp;</span>
                </span>
            </div>
        );
    }
}

export default Row