/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';

import { Grid, Row, Col, FormControl, Button, Glyphicon } from 'react-bootstrap';
import { createTask} from '../services/api-service';

class CreateTaskComponent extends React.Component {
    
    constructor(props){
        super(props);
        this.state={ value:"" };
    }
    
    handleChange(e) {
        this.setState({ value: e.target.value });
    }
    
    handleClick(e) {
        createTask({name:this.state.value}).then(data=>{
            console.log(data);
            if(!data.error){
                this.props.refresh();
                this.setState({value:""});
            }
        });
    }
    
    render(){
        return <Grid className="createTask">
                <Row>
                    <Col xs={12} md={6}>
                        <FormControl
                            type="text"
                            value={this.state.value}
                            placeholder="Enter a name for create a task"
                            onChange={this.handleChange.bind(this)}
                          />
                          <Button 
                            bsStyle="primary"
                            onClick={this.handleClick.bind(this)}>
                            <Glyphicon glyph="pushpin" />
                          </Button>
                    </Col>
                </Row>
            </Grid>;
    }
}

export default CreateTaskComponent;
