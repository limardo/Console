import React from 'react';
import Row from './row';
import Output from './output';
import WP from 'wordpress-rest-api'

class Rows extends React.Component {

    constructor(props) {
        super(props);
        this.wp = new WP({endpoint: WP_API_Settings.root});
        this.state = {
            commands: [0],
            loading: false,
            output: ''
        };
    }

    componentDidMount() {

    }

    componentWillUnmount() {
    }

    handleAddCommand(command) {
        var output = this.state.output;
        output = command;
        this.setState({output: '', loading: true});

        this.handleExecCommand();
    }

    handleExecCommand() {
        var scope = this;
        this.wp
            .pages()
            .then(function (data) {
                var output = _.join(_.map(data, _.property('title.rendered')), ' ');
                scope.setState({output: output, loading: false});
                scope.handleOutputCommand();
            })
            .catch(function (err) {
                alert(err);
            });
    }

    handleOutputCommand() {
        var commands = this.state.commands;
        commands.push(0);
        this.setState({commands: commands, output: ''});
    }

    render() {
        var Commands = this.state.commands.map(function (command, index) {
            return (
                <div key={index} className="row">
                    <Row command={this.handleAddCommand.bind(this)}/>
                    <Output
                        loading={this.state.loading}
                        output={this.state.output}
                        exec={this.handleOutputCommand.bind(this)}/>
                </div>
            );
        }.bind(this));

        return <div className="rows">{Commands}</div>;
    }
}

export default Rows