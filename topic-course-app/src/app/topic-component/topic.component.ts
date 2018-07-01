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
    constructor(private topicService: TopicService) { }

    ngOnInit() {
        this.getTopics();
    }

    getTopics(): void {
        this.topicService.getTopics().subscribe(topics => this.topics = topics);
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