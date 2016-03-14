import React from 'react';
import _ from 'lodash';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.banner = '';
    }

    componentDidMount(){
      //console.info(_.filter(this.props.data,{slug:'header'}));
    }

    render() {
      console.info(_.filter(this.props.data,{slug:'header'}));
        return (
            <header>
             <p>&nbsp;&nbsp; __&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; __&nbsp;&nbsp; _&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; __&nbsp; &nbsp;<br />&nbsp; / /&nbsp; __ _________ _&nbsp; / /&nbsp; (_)_ _&nbsp; ___ ________/ /__ <br />&nbsp;/ /__/ // / __/ _ `/ / /__/ /&nbsp; ' \/ _ `/ __/ _&nbsp; / _ \<br />/____/\_,_/\__/\_,_/ /____/_/_/_/_/\_,_/_/&nbsp; \_,_/\___/</p>     
            </header>
        );
    }
}

export default Header
