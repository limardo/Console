import React from 'react';
import WP from 'wordpress-rest-api'
import Header from './header';
import Row from './row';

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {content: ''};
        this.wp = new WP({endpoint: WP_API_Settings.root});
    }

    componentDidMount() {
        var scope = this;
        scope.wp.pages()
            .path('/pagina-di-esempio')
            .then(function (data) {
                console.info(data)
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
                <Header />
                <Row />
            </div>
        );
    }
}

export default Main