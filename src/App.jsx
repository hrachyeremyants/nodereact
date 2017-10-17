import classNames from 'classnames';
import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import _ from 'lodash';
import io from 'socket.io-client';
import { browserHistory } from 'react-router';
import './App.scss';
import 'react-bootstrap';

import * as messagesActions from './store/messages/actions';
import * as messagesSelector from './store/messages/selectors';

const socket = io.connect('http://localhost:8080');

class App extends Component {

    state = {
        form :{
            name : '',
            email : '',
            password : '',
            passwordConform : '',
        },
        messages : []
    };

    constructor(props) {
        super(props);
        autoBind(this);
    }

    componentWillMount(){

        this.props.fetchAllItems();

        this.props.fetchItem('59e4ba6cb9c40c1f402fed11');

        this.props.setCurrentStoreId('59e4ba6cb9c40c1f402fed11');
    }
    handleClickUnsetItem(){
        this.props.unsetCurrentStoreId();
    }

    handleOnChange(e){
        e.preventDefault();

        let {form} = this.state;

        form[e.target.name] = e.target.value;

        this.setState({form:form});

    }
    handleClickCreate(e){

        e.preventDefault();

        let { form } =  this.state;

        console.log(form);
    }
    render() {
        console.log(socket);
        let { messages } = this.state;
        if (this.props.messages){
            messages = _.map(this.props.messages,(item,i)=>{
                return (
                    <h1 key={item._id} className={'alert alert-primary'}>{item.message}</h1>);
            })
        }
        return (
            <div className={ 'container' }>
                <div className="sidebar transation-2s-in-out">
                    <div className={'row'}>
                        <div className={'panel'}>
                            <div className={'panel-header'}>
                                <h1 className={'alert alert-default'}>this is react component</h1>
                            </div>
                            <div className={'panel-body'}>
                                <div className={'form-group'}>
                                    <input type="text" onChange={this.handleOnChange} name='name' className={'form-control'}/>
                                </div>
                                <div className={'form-group'}>
                                    <input type="text" onChange={this.handleOnChange} name='email' className={'form-control'}/>
                                </div>
                                <div className={'form-group'}>
                                    <input type="email" onChange={this.handleOnChange} name='password' className={'form-control'}/>
                                </div>
                                <div className={'form-group'}>
                                    <input type="email" onChange={this.handleOnChange} name='passwordConform' className={'form-control'}/>
                                </div>
                                <div className={'form-group'}>
                                    <button
                                        className='btn btn-success form-control'
                                        onClick={this.handleClickCreate}
                                    >
                                        create
                                    </button>
                                </div>
                                <div className={'form-group'}>
                                    {messages}
                                </div>
                            </div>
                            <div className={'panel-footer'}>
                                <div className={'row'}>
                                    <div className={'form-group'}>
                                        {this.state.form.name}
                                    </div>
                                    <div className={'form-group'}>
                                        {this.state.form.lastName}
                                    </div>
                                    <div className={'form-group'}>
                                        {this.state.form.email}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        messages: messagesSelector.getItems(state),
        currentMessage : messagesSelector.getCurrentItem(state)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchAllItems: () => {
            dispatch(messagesActions.fetchAllItems())
        },
        fetchItem: (id) => {
            dispatch(messagesActions.fetchItem(id))
        },
        setCurrentStoreId: (id) => {
            dispatch(messagesActions.setCurrentItemId(id))
        },
        unsetCurrentStoreId: () => {
            dispatch(messagesActions.unsetCurrentItemId())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);