import React, { Component } from 'react';
import './App.css';
import { initSocket, subscribeToEvent, getTasks } from './services/api-service';
import { updateLoginInfo, isLogin, getUserInfo, getIdToken } from './services/authentification';
import LoginComponent from './component/LoginComponent';
import UserComponent from './component/UserComponent';
import { orderTasksByStatus } from './services/TasksHelper';
import CreateTaskComponent from './component/CreateTaskComponent';
import TasksListComponent from './component/TasksListComponent';
import NotificationSystem from 'react-notification-system';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = { tasks: { pending: [], ongoing: [], completed: [] } };
        this.refresh = this.refresh.bind(this);
        this._notificationSystem = null;
    }

    connectUser(user, idtoken, accesstoken) {
        updateLoginInfo(user, idtoken, accesstoken);
        this.refresh();
    }

    componentDidMount() {
        this._notificationSystem = this.refs.notificationSystem;
        if (isLogin()) {
            this.initSocket();
            this.refresh();
        }
    }

    initSocket() {
        initSocket(getIdToken());
        var self = this;
        subscribeToEvent("createTask", (data) => {
            self._notificationSystem.addNotification({
                title: "New task as been created",
                message: data.user + ' : ' + data.taskName,
                level: 'success'
            });
            self.refresh();
        });
        subscribeToEvent("updateTask", (data) => {
            self._notificationSystem.addNotification({
                title: "Task as been updated",
                message: data.user + ' : ' + data.taskName,
                level: 'info'
            });
            self.refresh();
        });
        subscribeToEvent("deleteTask", (data) => {
            self._notificationSystem.addNotification({
                title: "Task as been deleted",
                message: data.user + ' : ' + data.taskName,
                level: 'error'
            });
            self.refresh();
        });
    }

    refresh() {
        getTasks().then(data => {
            this.setState({ tasks: orderTasksByStatus(data) });
        });
    }

    render() {
        if (isLogin()) {
            var userInfo = getUserInfo();
            return (
                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">My tasks</h1>
                    </header>
                    <UserComponent userInfo={userInfo} />
                    <CreateTaskComponent refresh={this.refresh} />
                    <div className="App-tasks">
                        <TasksListComponent refresh={this.refresh} tasks={this.state.tasks.pending} />
                        <TasksListComponent refresh={this.refresh} tasks={this.state.tasks.ongoing} />
                        <TasksListComponent refresh={this.refresh} tasks={this.state.tasks.completed} />
                    </div>
                    <NotificationSystem ref="notificationSystem" />
                </div>);
        } else {
            return (
                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">My tasks</h1>
                    </header>
                    <LoginComponent updateInfo={this.connectUser.bind(this)} />
                </div>);
        }
    }
}

export default App;
