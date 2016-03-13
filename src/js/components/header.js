import React from 'react';

class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header>
                <span className="row-output">__                   __   _                   __</span>
                <span className="row-output">/ /  __ _________ _  / /  (_)_ _  ___ ________/ /__</span>
                <span className="row-output">/ /__/ // / __/ _ `/ / /__/ /  ' \/ _ `/ __/ _  / _ \</span>
                <span className="row-output">/____/\_,_/\__/\_,_/ /____/_/_/_/_/\_,_/_/  \_,_/\___/</span>
            </header>
        );
    }
}

export default Header