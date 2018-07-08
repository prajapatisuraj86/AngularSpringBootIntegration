import { Injectable } from "@angular/core";
import { Http, Response  } from "@angular/http";
import { Topic } from "./topic";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { CustomObject } from "../customobject";


@Injectable()
export class TopicService {
    getTopicUrl = "http://localhost:8184/topics";
    deleteTopicUrl = "http://localhost:8184/topics/";
    updateTopicUrl = "http://localhost:8184/topics/";

    constructor(private http: Http){}

    getTopics(): Observable<CustomObject> {
        return this.http.get(this.getTopicUrl).map(this.parseData).catch(this.handleError);
    }

    deleteTopic(topicId) : Observable<CustomObject> {
        return this.http.delete(this.deleteTopicUrl + topicId).map(this.parseData).catch(this.handleError);
    }

    updateTopic(topic, topicId) : Observable<CustomObject> {
        return this.http.put(this.updateTopicUrl + topicId, topic).map(this.parseData).catch(this.handleError);
    }

    // This method parses the data to JSON
    private parseData(res: Response)  {
        return res.json() || [];
    }

    private handleError(error: Response | any) {
        let errorMessage: string;
        errorMessage = error.message ? error.message : error.toString();
        // This returns another Observable for the observer to subscribe to
        return Observable.throw(errorMessage);
    }
}