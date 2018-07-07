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
    customObject : CustomObject;
    constructor(private topicService: TopicService) { }

    ngOnInit() {
        this.getTopics();
    }

    getTopics(): void {
        this.topicService.getTopics().subscribe(customObject => this.topics = customObject.resObject);
    }

    deleteTopic(topicId) : void {
        this.topicService.deleteTopic(topicId).subscribe(
            topics => {
                this.getTopics();
                return true;
            }

        );
    }

}