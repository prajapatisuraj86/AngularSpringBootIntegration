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
    responseStatus : String;
    customObject : CustomObject;
    deleteSuccess : boolean;
    isView : boolean = true;
    isUpdate : boolean = false;
    topicId : String;
    updateTopicObj : Topic;
    public messageAlert : MessageDemoComponent = new MessageDemoComponent();


    constructor(private topicService: TopicService) { }

    ngOnInit() {
        this.getTopics();
    }

    getTopics(): void {
        this.topicService.getTopics().subscribe(customObject => this.topics = customObject.resObject);
    }

    deleteTopic(topicId) : void {
        this.topicService.deleteTopic(topicId).subscribe(
            customObject => {
                this.responseStatus = customObject.responseStatus;
                if(this.isEqual(this.responseStatus,"SUCCESS")) {
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

    enableUpdateTopic(topic) : void {
        this.isView = false;
        this.isUpdate = true;
        this.updateTopicObj = topic;
        this.topicId = this.updateTopicObj.id;
    }

    updateTopic(topic) : void {
        this.topicService.updateTopic(topic, topic.id).subscribe(
            customObject => {
                this.responseStatus = customObject.responseStatus;
                if(this.isEqual(this.responseStatus,"SUCCESS")) {
                    console.log("Updated Successfully");
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

    isEqual(var1 : String, var2 : String) : boolean {
        return var1 == var2;
    }

}