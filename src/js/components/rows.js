import React from 'react';
import CommandStore from '../stores/commands';
import Action from '../actions/console';
import Row from './row';
import Output from './output';

const getCommands = () => {
    return {commands: CommandStore.getCommands()};
}

class Rows extends React.Component {

    constructor() {
        super();
        this.state = getCommands();
        this._onChange = this._onChange.bind(this);
    }

    componentDidMount() {
        CommandStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        CommandStore.removeChangeListener(this._onChange);
    }

    _onChange(actionType) {
        this.setState(getCommands);
    }

    render() {
        var rows = this.state.commands.map(row => {
            return (
                <div key={row.id} className="row">
                    <Row 
                        command={row} 
                        enter={Action.addCommand}
                        increment={Action.incrementHistory}
                        decrement={Action.decrementHistory}
                    />
                    <Output command={row}/>
                </div>
            );
        });

        return (
            <div className="rows">
                {rows}
            </div>
        );
    }
}

export default Rows;
