import Config from '../config';
import {dispatch,register} from '../dispatcher/console';
import {EventEmitter} from 'events';
import Api from '../api/WPApi';
import _ from 'lodash';

const CHANGE_EVENT = 'change';

let _list = _.map(Config.COMMAND_LIST, 'label');

let _cache = [];
let _current = 0;

Api.instance.pages().then(items => {
    var pages = items.map(item => {
        return _.result(item, 'slug');
    });

    _list = _.concat(_list, pages);
});

const AutoCompleteStore = Object.assign(EventEmitter.prototype,{
    emitChange(actionType) {
        this.emit(CHANGE_EVENT, actionType);
    },

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    dispatcherIndex: register(action => {
        switch (action.actionType) {
            case Config.INPUT_DELETE_CACHE:
                _cache = [];
                _current = 0;
                break;
            case Config.AUTOCOMPLETE_COMMAND:
                let result = _.filter(_list, item => {
                    var patt = new RegExp('^' + action.query);
                    return patt.test(item);
                });

                if( _.isEqual(result, _cache)){
                    if(_current < _.subtract(result.length, 1)){
                        _current = _.add(_current, 1);
                    }
                }else{
                    _current = 0;
                    _cache = result;
                }

                let acc = result[_current];

                if(!_.isUndefined(acc) && !_.isEmpty(acc)){
                    action.command.command = acc;
                }

                break;

        }

        AutoCompleteStore.emitChange(action.actionType);
    })
});

export default AutoCompleteStore;
