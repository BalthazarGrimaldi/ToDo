/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
export function orderTasksByStatus(data){
    var tasks={};
    tasks["pending"]=[];
    tasks["ongoing"]=[];
    tasks["completed"]=[];
    data.map((task, index) => {
        return tasks[task.status][tasks[task.status].length]=task;
    });
    return tasks;
}