import React from 'react';

class Cursor extends React.Component {

    render(){
        var cursorClass = (this.props.current === this.props.position) ? 'input-character active' : 'input-character';
        return(
            <span className={cursorClass}>{this.props.children}</span>
        );
    }
}

export default Cursor;
