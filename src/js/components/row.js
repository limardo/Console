import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';

class Row extends React.Component {

    constructor(props) {
        super(props);
        this.state = {command: ''};
        this.handleKeydown = this.handleKeydown.bind(this);
        this.exec = this.exec.bind(this);
    }

    componentDidMount() {
        $(document).bind('keypress', this.handleKeydown);
    }

    componentWillUnmount() {
        $(ReactDOM.findDOMNode(this)).find('.cursor').remove();
        $(document).unbind('keypress', this.handleKeydown);
    }

    exec(command) {
        this.props.command(command);
        this.componentWillUnmount();
    }

    handleKeydown(e) {
        var command = this.state.command;

        switch (e.which) {
            case 13:
                this.exec(command);
                break;
            case 8:
                command = command.substring(0, command.length - 1);
                break;
            default:
                command += e.key;
                break
        }

        this.setState({command});
    }

    render() {
        return (
            <div className="input">
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

export default Row;