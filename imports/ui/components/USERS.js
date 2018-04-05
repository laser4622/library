import {Component} from "react";
import React from "react";
import {ViewDocs} from "./ViewDocs";
import {Meteor} from "meteor/meteor";
import {User} from "../../models/users/user";
import {JournalArticle} from "../../models/documents/journal_article";
import {AVs} from "../../models/documents/av";
import Users from "../User"
import Users2 from "../User2"
import { withTracker } from 'meteor/react-meteor-data';
import Book from "../Book";
import AddBookButton from "../../api/AddBookButton";
import {Librarian} from "../../models/users/librarian";

import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

import {BrowserRouter, Route, Link} from "react-router-dom"
import Article from "../Article";
import AddArticleButton from "../../api/AddArticleButton";
import AV from "../AV";
import AddAVButton from "../../api/AddAVButton";
import {AddNewUser} from "../../api/AddNewUser";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;










const AllUsers = function() {
    let users =User.find({}).fetch();

    if(Meteor.userId()) {

        return <div>

            {users.map((user) => (<Users key={user._id} user={user}/>))}

        </div>
    }
};

const UserStories = function() {
    let users =User.find({}).fetch();

    if(Meteor.userId()) {

        return <div>

            {users.map((user) => (<Users2 key={user._id} user={user}/>))}

        </div>
    }
};












class USERS extends Component{

    render(){
        let isLibrarian = this.props.currentUser &&
            Librarian.findOne({libraryID : this.props.currentUser._id}) &&
            Librarian.findOne({libraryID : this.props.currentUser._id}).group === "Librarian";

        if(isLibrarian) return(
            <BrowserRouter>


                <Layout>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <Menu.Item key="1"><Link to="/users/allusers">All Users </Link></Menu.Item>
                            <Menu.Item key="2"><Link to="/users/userstories">User Stories </Link></Menu.Item>
                            <AddNewUser/>


                        </Menu>
                    </Sider>

                    <Layout style={{ padding: '0 24px 24px' }}>

                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item><Link to="/">Home </Link></Breadcrumb.Item>
                            <Breadcrumb.Item>Users</Breadcrumb.Item>
                        </Breadcrumb>

                        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 800 }}>

                            <Route exact path="/users/allusers" component={AllUsers} />
                            <Route exact path="/users/userstories" component={UserStories} />

                        </Content>
                    </Layout>



                </Layout>
            </BrowserRouter>

        );
        else return(<h1>YOU AREN'T LIBRARIAN</h1>)
    }
}


export default withTracker(() => {
    return {

        currentUser: Meteor.user(),
    };
})(USERS);
