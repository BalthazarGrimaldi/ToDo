/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';

import TaskComponent from './TaskComponent';
import { Col } from 'react-bootstrap';

class TasksListComponent extends React.Component {
    
    refreshList(){
        this.props.refresh();
    }
    
    render(){
        return  <Col xs={12} md={4}>
                {this.props.tasks.map((task, index) => (
                    <TaskComponent key={"task-"+index} 
                                  id={task._id} 
                                  name={task.name} 
                                  status={task.status[0]}
                                  refresh={this.refreshList.bind(this)}/>
                ))}
                </Col>;
        
    }
}


export default TasksListComponent;
