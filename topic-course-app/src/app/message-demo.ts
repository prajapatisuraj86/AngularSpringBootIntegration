import { Component, Input, OnInit } from "@angular/core";



@Component({
    selector: 'message-app',
    templateUrl: './message-demo.html'
})

export class MessageDemoComponent {

    public messages: any[];
    constructor() {
        this.messages = [];
    }


    public success(message: string): void {
        var msg = { "key": "success", "text": message }
        this.messages.push(msg);
        this.scheduleRemoval(msg);
    }

    public failure(message: string): void {
        var msg = { "key": "danger", "text": message }
        this.messages.push(msg);
        this.scheduleRemoval(msg);
    }

    private scheduleRemoval(msg: any) {
        setTimeout(() => {
            var idx = this.messages.indexOf(msg);
            this.messages.splice(idx, 1);
        }, 3000);
    }
    public remove(idx: any): void {
        if (idx >= 0) {
            this.messages.splice(idx, 1);
        }

    }

}