import React from 'react';
import _ from 'lodash';
import WP from 'wordpress-rest-api'
import Header from './header';
import Row from './row';

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.wp = new WP({endpoint: WP_API_Settings.root});
    }

    componentDidMount() {
        var scope = this;
        scope.wp
            .pages()
            .then(function (data) {
                scope.setState({data});
            })
            .catch(function (err) {
                alert(err);
            });
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div>
                <Header {...this.state} />
                <Row />
            </div>
        );
    }
}

export default Main
