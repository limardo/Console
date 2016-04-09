import React from 'react';
import Config from '../config';
import WP from 'wordpress-rest-api';
import Action from '../actions/console';
import _ from 'lodash';

const WPApi = {
    instance: new WP({endpoint: WP_API_Settings.root}),
    list(command){
        const template = (data) => {
            let row = data.map(item => {
                return _.join([
                    `<dt>${item.slug}</dt>`,
                    `<dd>${item.help || '&nbsp'}</dd>`
                ],'');
            });

            return `<dl>${_.join(row,'')}</dl>`;
        };

        this.instance
        .pages()
        .then(data => {
            data = _.orderBy(data, ['menu_order']);
            this.complete(command, data, template)
        })
        .catch(this.error.bind(this));
    },
    page(command){
        const template = (data) => {
            return _.head(_.map(data, 'content.rendered'));
        };

        this.instance
        .pages()
        .slug(command.command)
        .then(data=> {

            if(_.isEmpty(data)){
                return this.notFound(command);
            }

            this.complete(command, data, template);
        })
        .catch(this.error.bind(this));
    },
    help(command){

        var data = Config.COMMAND_LIST;

        const template = (data) => {

            var row = data.map(row => {
                return _.join([
                    `<dt>${row.label}</dt>`,
                    `<dd>${row.description}</dd>`
                ],'');
            });

            return `<dl>${_.join(row, '')}</dl>`;
        };

        setTimeout(() => {
            this.complete(command, data, template);
        }, 500);
    },
    complete(command, data, template){
        var output = template(data);

        Action.execCommand(command);
        Action.outputCommand(command, output);
    },
    empty(command){
        const data = '';
        const template = (data) => {
            return '';
        }

        setTimeout(() => {
            this.complete(command, data, template);
        }, 200);
    },
    notFound(command){
        const data = 'command not found: ' + command.command;
        const template = (data) => {
            return `<p>${data}</p>`;
        }

        setTimeout(()=>{
            this.complete(command, data, template);
        }, 200);
    },
    error(){
        alert('Wordpress API Error');
    }
};

export default WPApi;
