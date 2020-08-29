import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import {updateTask, deleteTask} from '../services/api-service';

class TaskComponent extends React.Component {
    
    handleUpdateTask(){
        var updated_status= this.props.status==="pending" ? "ongoing" : "completed";
        var refresh = this.props.refresh;
        updateTask(this.props.id, {status:  updated_status}).then(data=>{
           console.log(data); 
           if(!data.error){
                refresh();
            }
        });
    }
    
    handleDeleteTask(){
        var refresh = this.props.refresh;
        deleteTask(this.props.id).then(data=>{
           console.log(data); 
           if(!data.error){
                refresh();
            }
        });
    }
    
    render() { 
        const buttons_update = this.props.status!=="completed" ?
                                <Button bsStyle="info"
                                    onClick={this.handleUpdateTask.bind(this)}>
                                    <Glyphicon glyph="chevron-right" />
                                </Button> : ""; 
        return <div className={"task task-"+this.props.status}>
                <span>{this.props.name}</span>
                {buttons_update}
                <Button bsStyle={this.props.status!=="completed" ? "info" : "success"}
                        onClick={this.handleDeleteTask.bind(this)}>
                        <Glyphicon glyph="trash" />
                </Button>
            </div>;
    }
};

export default TaskComponent;
