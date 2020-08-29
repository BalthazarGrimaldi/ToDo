import axios from 'axios';
import openSocket from 'socket.io-client';
import { getIdToken } from "./authentification";

const BASE_URL = 'http://localhost:3300';

export {initSocket, subscribeToEvent, getTasks, getTask, createTask, updateTask, deleteTask};

var socket= null;

function initSocket(token){
    socket= openSocket(BASE_URL, {query: 'token='+token}, {transports: ['websocket']});
}

function subscribeToEvent(name, callback){
    if(socket!==null){
        socket.on(name, callback);
    }
}


function getTasks() {
  const url = `${BASE_URL}/tasks`;
  var token =  getIdToken();
  return axios.get(url, { headers: { Authorization: `${token}` }}).then((response) => response.data);
}

function getTask(taskId) {
  const url = `${BASE_URL}/task/`+taskId;
  var token =  getIdToken();
  return axios.get(url, { headers: { Authorization: `${token}` }}).then((response) => response.data);
}

function createTask(dataTask){
    const url = `${BASE_URL}/tasks`;
    var token =  getIdToken();
    return axios.post(url, dataTask, { headers: { Authorization: `${token}` }}).then(response => response.data);
 }
 
 function updateTask(taskId, dataTask){
    const url = `${BASE_URL}/task/`+taskId;
    var token =  getIdToken();
    return axios.put(url, dataTask, { headers: { Authorization: `${token}` }}).then(response => response.data);
 }
 
 function deleteTask(taskId){
    const url = `${BASE_URL}/task/`+taskId;
    var token =  getIdToken();
    return axios.delete(url, { headers: { Authorization: `${token}` }}).then(response => response.data);
 }
