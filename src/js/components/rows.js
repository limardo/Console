import React from 'react';
import Row from './row';
import Output from './output';
import WP from 'wordpress-rest-api';
import $ from 'jquery';
import _ from 'lodash';

class Rows extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            commands: [0]
        };
    }

    componentDidMount() {

    }

    componentWillUnmount() {
    }

    handleLoadCommand(command) {
        $(document).trigger('command', [command]);
    }

    handleExecCommand() {
        $(document).trigger('exec');
    }


    handleOutputCommand() {
        $(document).trigger('output');

        var commands = this.state.commands;
        commands.push(0);
        this.setState({commands});
    }

    render() {
        var Commands = this.state.commands.map(function (command, index) {
            return (
                <div key={index} className="row">
                    <Row command={this.handleLoadCommand.bind(this)}/>
                    <Output
                        exec={this.handleExecCommand.bind(this)}
                        output={this.handleOutputCommand.bind(this)}/>
                </div>
            );
        }.bind(this));

        return <div className="rows">{Commands}</div>;
    }
}

export default Rows;