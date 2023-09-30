import { LightningElement } from 'lwc';
import { CloseActionScreenEvent } from "lightning/actions";
export default class CreateTaskAction extends LightningElement {
    isaction=true;
    handleclick(){
        this.refs.createToDO.handleParentClick();
    }
    closedAction(){
        this.dispatchEvent(new CloseActionScreenEvent());
    }

}