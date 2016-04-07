import Config from '../config';
import {dispatch,register} from '../dispatcher/console';
import {EventEmitter} from 'events';
import _ from 'lodash';

const CHANGE_EVENT = 'change';

let _current = 0;
let _history = [];

const HistoryStore = Object.assign(EventEmitter.prototype, {
    emitChange(actionType) {
        this.emit(CHANGE_EVENT, actionType);
    },

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    dispatcherIndex: register( action => {
        switch(action.actionType){
            case Config.ADD_COMMAND:
                _history.push(_.get(action.command, 'command'));
                _current = _.size(_history);
                break;
            case Config.HISTORY_INCREMENT:
                if(_current < _.size(_history)){
                    _current = _.add(_current, 1);
                    action.command.command = _history[_current];
                }
                break;
            case Config.HISTORY_DECREMENT:
                if(_current > 0){
                    _current = _.subtract(_current, 1);
                    action.command.command = _history[_current];
                }
                break;
        }

        HistoryStore.emitChange(action.actionType);
    })
});

export default HistoryStore;
