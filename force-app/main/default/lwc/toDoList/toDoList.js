import { LightningElement, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getToDoList from '@salesforce/apex/ToDoController.getToDoList';
import {refreshApex} from '@salesforce/apex';
import updateToDo from '@salesforce/apex/ToDoController.updateToDo';
export default class ToDoList extends LightningElement {
    toDoList;
    @api taskStatus;
     
    get pageTitle(){
        return this.taskStatus+ 'tasks';
    }
    get showButton(){
        return this.taskStatus==='pending'?true:false;
    }
   
    @wire(getToDoList,{taskStatus:'$taskStatus'})
    wiredToDoList(result){
        this.wiredToDoListResult=result;
        if(result.data){
            this.toDoList=result.data;
        }else if (result.error){
            const evt=new ShowToastEvent({
                title:"error",
                message:result.error.message.body,
                variant:"error"
            });
            this.dispatchEvent(evt);

        }
        
    }
    @api refreshList(){
        refreshApex(this.wiredToDoListResult);
    }
    handleClick(event){

        updateToDo({toDoId:event.target.dataset.recordid})
         .then((result) => {
             if(result=="Success"){
                
                 const evt=new ShowToastEvent({
                     title:"success",
                     message:"Task completed Successfully ",
                     variant:"success"
                 });
                 this.dispatchEvent(evt);
                 this.dispatchEvent(new CustomEvent('refreshtodo'));
 
             }
             
           })
           .catch((error) => {
             console.log("🚀 ~ file: CreateTask.js:56 ~ CreateTask ~ handleClick ~ error:", error);
             const evt=new ShowToastEvent({
                 title:"error",
                 message:error.message.body,
                 variant:"error"
             });
             this.dispatchEvent(evt);
           });
}}