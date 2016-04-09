import React from 'react';
import Cursor from './cursor';
import CommandStore from '../stores/commands';
import HistoryStore from '../stores/history';
import _ from 'lodash';

class Row extends React.Component {

    constructor(props) {
        super(props);
        this.state = {command: props.command, position: 0};
        this._onChange = this._onChange.bind(this);
        this._onKeyDown = this._onKeyDown.bind(this);
        this._onEnter = this._onEnter.bind(this);
        this._moveLeft = this._moveLeft.bind(this);
        this._moveRight = this._moveRight.bind(this);
        this._move = this._move.bind(this);
        this._reinitPosition = this._reinitPosition.bind(this);
    }

    _onChange(e) {
        var command = this.state.command;
        command.command = e.target.value;
        this.setState({command});
    }

    _onKeyDown(e) {
        if (e.keyCode === 13) {
            this._onEnter();
        }else if(e.keyCode === 37){
            this._moveLeft();
        }else if(e.keyCode === 39){
            this._moveRight();
        }else if(e.keyCode === 38){
            this.props.decrement(this.state.command);
            this._reinitPosition();
        }else if(e.keyCode === 40){
            this.props.increment(this.state.command);
            this._reinitPosition();
        }else if(e.keyCode === 9){
            e.preventDefault();
            this.props.autocomplete(this.state.command, e.currentTarget.value);
            this._reinitPosition();
        }else if(e.keyCode === 8 || e.keyCode === 46){
            this.props.delete();

            if(e.keyCode === 8){
                this._moveLeft();
            }
        }else{
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
        this.setState({position: this.state.command.command.length});
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
