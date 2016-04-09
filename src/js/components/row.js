import React from 'react';
import ReactDOM from 'react-dom';
import Cursor from './cursor';
import Config from '../config';
import CommandStore from '../stores/commands';
import HistoryStore from '../stores/history';
import _ from 'lodash';

class Row extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            command: props.command,
            position: 0
        };
        this._tabCache = '';
        this._onChange = this._onChange.bind(this);
        this._onKeyDown = this._onKeyDown.bind(this);
        this._onEnter = this._onEnter.bind(this);
        this._moveLeft = this._moveLeft.bind(this);
        this._moveRight = this._moveRight.bind(this);
        this._move = this._move.bind(this);
        this._reinitPosition = this._reinitPosition.bind(this);
        this._reinitTabCache = this._reinitTabCache.bind(this);
        this._listen = this._listen.bind(this);
    }

    componentDidMount() {
        CommandStore.addChangeListener(this._listen);
    }

    componentWillUnmount() {
        CommandStore.removeChangeListener(this._listen);
    }

    _onChange(e) {
        var command = this.state.command;
        command.command = e.target.value;
        this.setState({command});
    }

    _onKeyDown(e) {
        var keyCode = e.keyCode || e.which;

        if (keyCode === 13) {
            this._reinitTabCache();
            this._onEnter();
        }else if(keyCode === 37){
            this._reinitTabCache();
            this._moveLeft();
        }else if(keyCode === 39){
            this._reinitTabCache();
            this._moveRight();
        }else if(keyCode === 38){
            this._reinitTabCache();
            this.props.decrement(this.state.command);
            this._reinitPosition();
        }else if(keyCode === 40){
            this._reinitTabCache();
            this.props.increment(this.state.command);
            this._reinitPosition();
        }else if(keyCode === 9){
            e.preventDefault();

            if(_.isEmpty(this._tabCache)){
                this._tabCache = e.currentTarget.value;
            }

            this.props.autocomplete(this.state.command, this._tabCache);
            this._reinitPosition();
        }else if(keyCode === 8 || e.keyCode === 46){
            this._reinitTabCache();

            if(keyCode === 8){
                this._moveLeft();
            }
        }else{
            this._reinitTabCache();
            this.setState({position: e.currentTarget.selectionStart + 1});
        }
    }

    _onEnter() {
        // browserHistory.push('/' + command);
        this._reinitPosition();
        this.refs.outputCommand.removeChild(this.refs.cursor);
        this.props.enter(this.state.command);
    }

    _moveLeft(){
        var position = this.state.position;

        if(position > 0 ){
            position -= 1;
            this.setState({position});
        }
    }

    _moveRight(){
        var position = this.state.position;

        if(position < this.props.command.command.length ){
            position += 1;
            this.setState({position});
        }
    }

    _move(cursors){
        var selected = _.find(cursors, {key: this.state.position.toString()});
        if(_.isUndefined(selected)){
            if(this.refs.cursor){
                this.refs.cursor.className = "cursor";
            }
        }else{
            if(this.refs.cursor){
                this.refs.cursor.className = "cursor hidden";
            }
        }
    }

    _reinitPosition() {
        setTimeout( () => {
            this.refs.inputCommand.selectionStart = this.state.command.command.length;
            this.setState({position: this.state.command.command.length});
        }, 50);
    }

    _reinitTabCache() {
        this.props.delete();
        this._tabCache = '';
    }

    _listen(action){
        if(action === Config.ADD_COMMAND){
            this.componentWillUnmount();
            this.refs.inputCommand.disabled = true;
        }
    }

    render() {
        var input = _.map(this.props.command.command, (item, index) => {
            return (
                <Cursor key={index} position={index} current={this.state.position}>
                    {item}
                </Cursor>
            );
        });

        this._move(input);

        return (
            <div className="input">
                <input
                    ref="inputCommand"
                    className="textbox"
                    onChange={this._onChange}
                    onKeyDown={this._onKeyDown}
                    autoFocus={true}
                    value={this.props.command.command}
                />
                <i className="fa fa-cloud"></i>
                <i className="fa fa-tilde"></i>
                <span className="command" ref="outputCommand">
                    {input}
                    <span className="cursor" ref="cursor">&nbsp;</span>
                </span>
            </div>
        );
    }
}

export default Row;
