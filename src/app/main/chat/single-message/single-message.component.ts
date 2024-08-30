import { Component, inject, Input, OnInit } from '@angular/core';
import { Message } from '../../../models/message.class';
import { UiService } from '../../../services/ui.service';
import { FirestoreService } from '../../../services/firestore.service';
import { Thread } from '../../../models/thread.class ';

@Component({
  selector: 'app-single-message',
  standalone: true,
  imports: [],
  templateUrl: './single-message.component.html',
  styleUrl: './single-message.component.scss'
})
export class SingleMessageComponent implements OnInit {
  uiService = inject(UiService);
  fireService = inject(FirestoreService);
  @Input() currentMessage: Message = new Message();
  @Input() threadMessage: boolean = false;

  ngOnInit(): void {
    this.currentMessage = new Message(this.currentMessage);
  }

  answer() {
    this.uiService.showThread = true;
    this.setCurrentThread();
    this.fireService.currentMessage = new Message(this.currentMessage);
    console.log(this.fireService.currentThread);

  }


  setCurrentThread() {
    if (this.currentMessage.thread) {
      if (this.currentMessage.thread.messages.length > 0) {
        console.log('Thread gefunden');

        this.fireService.currentThread = new Thread(this.currentMessage.thread)
      } else {
        console.log('Keinen Thread gefunden, erstelle neuen');

        this.fireService.currentThread = this.createThread();
        this.currentMessage.thread = this.fireService.currentThread;
        this.saveUpdatedConversation();
      }
    }

  }

  createThread(): Thread {
    return new Thread({
      id: '',
      rootMessage: new Message(this.currentMessage),
      messages: []
    })
  }

  saveUpdatedConversation() {
    const curentMessageId = this.currentMessage.id;
    const updateId = this.fireService.currentConversation.messages.findIndex(message => message.id === curentMessageId);
    this.fireService.currentConversation.messages[updateId] = this.currentMessage;
    this.fireService.addConversation(this.fireService.currentConversation);
  }
}
