import { Injectable } from "@angular/core";
import { Message } from "primeng/api";

@Injectable({
    providedIn: "root"
})
export class MessageService {
    messages: Message[] = []

    add(message: Message) {
        this.messages.push(message)
        console.log(this.messages)
    }

    clear() {
        this.messages = []
    }
}