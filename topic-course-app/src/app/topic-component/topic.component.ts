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
    deleteSuccess: boolean;
    isView: boolean = true;
    isUpdate: boolean = false;
    isAdd: boolean = false;
    topicId: String;
    isAddValidation : boolean = false;
    errorMessage : String = '';
    updateTopicObj: Topic;
    public addTopicObj: Topic = new Topic();
    public messageAlert: MessageDemoComponent = new MessageDemoComponent();


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
                    this.deleteSuccess = true;
                    console.log("Deleted Successfully");
                    this.messageAlert.success("Deleted Sucessfully.");
                } else {
                    this.deleteSuccess = false;
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
        this.topicService.updateTopic(topic, topic.id).subscribe(
            customObject => {
                this.responseStatus = customObject.responseStatus;
                if (this.isEqual(this.responseStatus, "SUCCESS")) {
                    console.log("Topic Updated Successfully");
                } else {
                    console.log("Error occoured while updating Topics");
                }
                this.isView = true;
                this.isUpdate = false;
                this.getTopics();
                return true;
            }
        );
    }

    cancelUpdate() {
        this.isView = true;
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
                        console.log("Topic added Successfully");
                    } else {
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

    isEqual(var1: String, var2: String): boolean {
        return var1 == var2;
    }

}