import React from 'react';
import Config from '../config';
import CommandStore from '../stores/commands';


class Output extends React.Component {
    constructor(props) {
        super(props);
        this.state = {command: props.command};
        this._onChange = this._onChange.bind(this);
    }

    componentDidMount() {
        CommandStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        CommandStore.removeChangeListener(this._onChange);
    }

    _onChange(actionType) {
        this.setState({
            command: this.props.command
        });

        if (actionType === Config.OUTPUT_COMMAND) {
            // browserHistory.push('/' + command);
            window.scrollTo(0, window.scrollMaxY);
        }
    }

    render() {
        var output = this.props.command.loading ? '<span class="cursor"></span>' : this.props.command.output;
        return (
            <div className="output">
                <span className="command" dangerouslySetInnerHTML={{__html:output}}/>
            </div>
        );
    }
}

export default Output;
