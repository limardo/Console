import React from 'react';
import _ from 'lodash';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.banner = '';
    }

    componentDidMount() {
        //console.info(_.filter(this.props.data,{slug:'header'}));
    }

    render() {
        var header = _.find(this.props.data, {slug: 'header'});
        var content = _.isObject(header) && _.isObject(header.content) ? header.content.rendered : '';

        return (
            <header dangerouslySetInnerHTML={{__html:content}}/>
        );
    }
}

export default Header