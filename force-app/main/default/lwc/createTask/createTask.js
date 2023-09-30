import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import saveToDo from '@salesforce/apex/ToDoController.saveToDo';
export default class CreateTask extends LightningElement {
   @api targetparent
    tasktitle;
duedate;
showduedate=false;
showsave=false;
connectedCallback(){
    console.log("🚀 ~ file: CreateTask.js:10 ~ CreateTask ~ connectedCallback ~ connectedCallback:", this.targetparent);
    
}

events(event){
const fieldname=event.target.name;
if(fieldname==='TaskTitle'){
    this.tasktitle=event.target.value;
    console.log('tasktitle   ' , this.tasktitle);
    if(this.tasktitle!=''){
        this.showduedate=true;
    }else{
        this.showduedate=false;
    }
}else if(fieldname==='duedate'){
    this.duedate=event.target.value;
    console.log('tasktitduedatele   ' ,this.duedate);
   
    if((this.duedate!="")&&(this.targetparent!=true)){
       
        this.showsave=true;
    }else{
        this.showsave=false;
    }
}

}

handleClick(event){

    saveToDo({title:this.tasktitle,duedate:this.duedate})
    .then((result) => {
        if(result=="success"){
            this.tasktitle='';
            this.duedate='';

            const evt=new ShowToastEvent({
                title:"success",
                message:"A new item has been added in your todo list",
                variant:"success"
            });
            this.dispatchEvent(evt);
            this.dispatchEvent(new CustomEvent('refreshtodo'));
            if(this.targetParent===true){
                const selectedEvent =new CustomEvent('closedaction',{
                    detail:result
                });
                this.dispatchEvent(selectedEvent);
            }
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
    
}
@api
handleParentClick(){
    this.handleClick();
}

}