import { MessageDemoComponent } from './../message-demo';
import { CustomObject } from './../customobject';
import { TopicService } from './topic.service';
import { Component } from "@angular/core";
import { Topic } from './topic';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-topic',
    templateUrl: './topic.component.html'
})

export class TopicComponent {

    topics: Topic[];
    responseStatus: String;
    customObject: CustomObject;
    isView: boolean = true;
    isUpdate: boolean = false;
    isAdd: boolean = false;
    topicId: String;
    errorMessage: String = '';
    updateTopicObj: Topic;
    public addTopicObj: Topic = new Topic();
    isAddSucess: boolean = false;
    isAddValidation: boolean = false;
    isAddError: boolean = false;
    isUpdateSucess: boolean = false;
    isUpdateValidation: boolean = false;
    isUpdateError: boolean = false;
    isDeleteSuccess: boolean = false;
    isDeleteError: boolean = false;


    constructor(private topicService: TopicService) { }

    ngOnInit() {
        this.getTopics();
    }

    getTopics(): void {
        this.topicService.getTopics().subscribe(customObject => this.topics = customObject.resObject);
    }

    deleteTopic(topicId): void {
        this.topicService.deleteTopic(topicId).subscribe(
            customObject => {
                this.responseStatus = customObject.responseStatus;
                if (this.isEqual(this.responseStatus, "SUCCESS")) {
                    this.isDeleteSuccess = true;
                    console.log("Deleted Successfully");
                } else {
                    this.isDeleteSuccess = false;
                    console.log("Error occoured while deleting Topics");
                }
                this.getTopics();
                return true;
            }
        );
    }

    enableUpdateTopic(topic): void {
        this.isView = false;
        this.isUpdate = true;
        this.isAdd = false;
        this.updateTopicObj = topic;
        this.topicId = this.updateTopicObj.id;
    }

    updateTopic(topic): void {
        if (this.updateTopicObj.name == null || this.updateTopicObj.name.trim().length <= 0) {
            this.isUpdateValidation = true;
            this.errorMessage = "Topic Name is Mandatory";
        } else if (this.updateTopicObj.description == null || this.updateTopicObj.description.trim().length <= 0) {
            this.isUpdateValidation = true;
            this.errorMessage = "Topic Description is Mandatory";
        } else {
            this.topicService.updateTopic(topic, topic.id).subscribe(
                customObject => {
                    this.responseStatus = customObject.responseStatus;
                    if (this.isEqual(this.responseStatus, "SUCCESS")) {
                        this.isUpdateSucess = true;
                        console.log("Topic Updated Successfully");
                    } else {
                        this.isUpdateError = true;
                        console.log("Error occoured while updating Topics");
                    }
                    this.isUpdateValidation = false;
                    this.isView = true;
                    this.isUpdate = false;
                    this.getTopics();
                    return true;
                }
            );
        }
    }

    cancelUpdate() {
        this.isView = true;
        this.isUpdateValidation = false;
        this.isUpdate = false;
    }

    addTopic(): void {
        if (this.addTopicObj.id == null || this.addTopicObj.id.trim().length <= 0) {
            this.isAddValidation = true;
            this.errorMessage = "Topic Id is Mandatory";
        } else if (this.addTopicObj.name == null || this.addTopicObj.name.trim().length <= 0) {
            this.isAddValidation = true;
            this.errorMessage = "Topic Name is Mandatory";
        } else if (this.addTopicObj.description == null || this.addTopicObj.description.trim().length <= 0) {
            this.isAddValidation = true;
            this.errorMessage = "Topic Description is Mandatory";
        } else {
            this.topicService.addTopic(this.addTopicObj).subscribe(
                customObject => {
                    this.responseStatus = customObject.responseStatus;
                    if (this.isEqual(this.responseStatus, "SUCCESS")) {
                        this.isAddSucess = true;
                        console.log("Topic added Successfully");
                    } else {
                        this.isAddError = true;
                        console.log("Error occoured while updating Topics");
                    }
                    this.isAdd = false;
                    this.isAddValidation = false;
                    this.getTopics();
                    return true;
                }
            );
        }
    }

    cancelAdd(): void {
        this.isAdd = false;
        this.isAddValidation = false;
    }

    enableAddTopic(): void {
        this.addTopicObj = new Topic();
        this.isAdd = true;
    }

    closeAddSuccess(): void {
        this.isAddSucess = false;
    }

    closeAddError(): void {
        this.isAddError = false;
    }

    closeUpdateSuccess(): void {
        this.isUpdateSucess = false;
    }

    closeUpdateError(): void {
        this.isUpdateError = false;
    }

    closeDeleteSuccess(): void {
        this.isDeleteSuccess = false;
    }

    closeDeleteError(): void {
        this.isDeleteError = false;
    }

    isEqual(var1: String, var2: String): boolean {
        return var1 == var2;
    }

}