import React from 'react';
import Config from '../config';
import Preload from './preload';
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
            this.componentWillUnmount();
        }
    }

    render() {
        const getOutput = () => {
            if(!this.props.command.loading){
                return (
                    <span
                        className="command"
                        dangerouslySetInnerHTML={{__html:this.props.command.output}}
                    />
                );
            }

            return (
                <span className="command">
                    <Preload/>
                </span>
            );
        }

        return (
            <div className="output">
                {getOutput()}
            </div>
        );
    }
}

export default Output;
