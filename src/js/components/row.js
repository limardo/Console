import React from 'react';
import CommandStore from '../stores/commands';

class Row extends React.Component {

    constructor(props) {
        super(props);
        this.state = {command: props.command};
        this._onChange = this._onChange.bind(this);
        this._onKeyDown = this._onKeyDown.bind(this);
        this._onEnter = this._onEnter.bind(this);
    }

    _onChange(e) {
        var command = this.state.command;
        command.command = e.target.value;
        this.setState({command});
    }

    _onKeyDown(e) {
        if (e.keyCode === 13) {
            this._onEnter();
        }
    }

    _onEnter() {
        // browserHistory.push('/' + command);
        this.refs.outputCommand.removeChild(this.refs.cursor);
        this.props.handle(this.state.command);
    }

    render() {
        return (
            <div className="input">
                <input
                    className="textbox"
                    onChange={this._onChange}
                    onKeyDown={this._onKeyDown}
                    autoFocus={true}
                />
                <i className="fa fa-cloud"></i>
                <i className="fa fa-tilde"></i>
                <span className="command" ref="outputCommand">
                    {this.props.command.command}
                    <span className="cursor" ref="cursor">&nbsp;</span>
                </span>
            </div>
        );
    }
}

export default Row;