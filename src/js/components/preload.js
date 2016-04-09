import React from 'react';

class Preload extends React.Component {

    constructor(props){
        super(props);
        this._inteval = 0;
        this._time = 500;
        this._current = 0;
        this._classes = ['0', '33', '66', '100'];
        this._loading = this._loading.bind(this);
    }

    componentDidMount(){
        this._interval = setInterval(this._loading, this._time / this._classes.length); 
    }

    componentWillUnmount(){
        clearInterval(this._interval);
    }

    _loading() {
        if(this._current < this._classes.length - 1){
            this._current += 1;
        }else{
            this._current = 0;
        }

        let classPreload = 'cursor loader loader-' + this._classes[this._current];
        this.refs.preloader.className = classPreload;
    }
    
    render(){
        return(
            <span
                ref="preloader"
                className="cursor"
            />
        );
    }
}

export default Preload;
