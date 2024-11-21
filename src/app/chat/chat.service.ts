import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  PATH_OF_API = environment.apiBaseUrl

  constructor(private httpclient: HttpClient) {
  }

  sendMessage(messageRequest: { conversationId: number; text: string }): Observable<any> {
    return this.httpclient.post(this.PATH_OF_API + "/api/messages/send", messageRequest);
  }
  getMessages(conversationId: number): Observable<any> {
    return this.httpclient.get(this.PATH_OF_API + "/api/messages/"+conversationId);
  }
  getUserConversations(userId: number): Observable<any> {
    return this.httpclient.get(this.PATH_OF_API + "/api/messages/"+userId);
  }
}
