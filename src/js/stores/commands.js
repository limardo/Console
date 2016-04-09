import Config from '../config';
import {dispatch,register} from '../dispatcher/console';
import {EventEmitter} from 'events';
import {browserHistory} from 'react-router';
import Api from '../api/WPApi';
import _ from 'lodash';

const CHANGE_EVENT = 'change';

var _commands = [];
var defaultCommand = {
    id: 1,
    command: '',
    output: '',
    loading: false
};

_commands.push(_.clone(defaultCommand));

const _findCommand = (command) => {
    return _commands.find(_commands => _commands.id === command.id);
};

const _last = () => {
    return _.maxBy(_commands, 'id');
};

const _incrementCommand = () => {
    var last = _last();

    if (last) {
        _commands.push(_.defaults({id: (last.id + 1)}, defaultCommand));
    } else {
        _commands.push(defaultCommand);
    }
};

const _addCommand = (command) => {
    var cmd = _findCommand(command);

    cmd.loading = true;

    switch (_.trim(cmd.command)) {
        case 'list':
        case 'ls':
            return Api.list(cmd);
            break;
        case 'help':
            return Api.help(cmd);
            break;
        case '':
            return Api.empty(cmd);
            break;
        default:
            return Api.page(cmd);
            break;
    }
};

const _execCommand = (command) => {
    var cmd = _findCommand(command);
    cmd.loading = false;
};

const _outputCommand = (command, output) => {
    var cmd = _findCommand(command);
    cmd.output = output;
    _incrementCommand();
    browserHistory.push('/' + command.command);
    console.info(command.command);
};

const CommandStore = Object.assign(EventEmitter.prototype, {
    emitChange(actionType){
        this.emit(CHANGE_EVENT, actionType);
    },

    addChangeListener(callback){
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener(callback){
        this.removeListener(CHANGE_EVENT, callback);
    },

    getCommands() {
        return _commands;
    },

    dispatcherIndex: register(action => {
        switch (action.actionType) {
            case Config.ADD_COMMAND:
                _addCommand(action.command);
                break;
            case Config.EXEC_COMMAND:
                _execCommand(action.command);
                break;
            case Config.OUTPUT_COMMAND:
                _outputCommand(action.command, action.output);
                break;
        }
        CommandStore.emitChange(action.actionType);
    })
});

export default CommandStore;
