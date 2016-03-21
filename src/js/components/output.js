import React from 'react';
import ReactDOM from 'react-dom';
import EventEmitter from 'events';
import { browserHistory } from 'react-router'
import WP from 'wordpress-rest-api';
import $ from 'jquery';
import _ from 'lodash';

class Output extends React.Component {

    constructor(props) {
        super(props);
        this.state = {output: ''};

        this.handleLoadCommand = this.handleLoadCommand.bind(this);
        this.handleExecCommand = this.handleExecCommand.bind(this);
        this.handleOutputCommand = this.handleOutputCommand.bind(this);
    }

    componentDidMount() {
        this.wp = new WP({endpoint: WP_API_Settings.root});
        $(document).bind('command', this.handleLoadCommand);
        $(document).bind('exec', this.handleExecCommand);
        $(document).bind('output', this.handleOutputCommand);
    }

    componentWillUnmount() {
        $(document).unbind('command', this.handleLoadCommand);
        $(document).unbind('exec', this.handleExecCommand);
        $(document).unbind('output', this.handleOutputCommand);
    }

    handleLoadCommand(event, command) {
        var output = '<span className="cursor"></span>';
        this.setState({output});

        switch (command) {
            case 'list':
                this.wp
                    .pages()
                    .then(this.handleList.bind(this))
                    .catch(this.handleError.bind(this));
                break;
            default:
                browserHistory.push('/' + command);
                this.wp
                    .pages()
                    .slug(command)
                    .then(this.handleComplete.bind(this))
                    .catch(this.handleError.bind(this));
                break;
        }
    }

    handleExecCommand() {
        this.props.output();
    }

    handleOutputCommand() {
        this.componentWillUnmount();
    }

    handleList(data) {
        var output = _.join(_.map(data, _.property('title.rendered')), '<br>');
        this.setState({output});
        this.props.exec();
    }

    handleComplete(data) {
        var output = _.head(_.map(data, _.property('content.rendered')));
        this.setState({output});
        this.props.exec();
    }

    handleError(err) {
        alert(err);
    }

    render() {
        return (
            <div className="output">
                <span className="command" dangerouslySetInnerHTML={{__html:this.state.output}}/>
            </div>
        );
    }
}

export default Output;