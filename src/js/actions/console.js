import Config from '../config';
import {dispatch,register} from '../dispatcher/console';

export default {
    addCommand(command){
        dispatch({
            actionType: Config.ADD_COMMAND,
            command: command
        });
    },
    execCommand(command){
        dispatch({
            actionType: Config.EXEC_COMMAND,
            command: command,
        });
    },
    outputCommand(command, output){
        dispatch({
            actionType: Config.OUTPUT_COMMAND,
            command: command,
            output: output
        });
    },
    incrementHistory(command){
        dispatch({
            actionType: Config.HISTORY_INCREMENT,
            command: command
        });
    },
    decrementHistory(command){
        dispatch({
            actionType: Config.HISTORY_DECREMENT,
            command: command
        });
    },
}
