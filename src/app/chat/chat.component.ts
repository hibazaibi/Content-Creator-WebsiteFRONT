import { Component, OnInit } from '@angular/core';
import {ChatService} from "./chat.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  userId = 1; // Assuming logged-in user ID (should be dynamic in real scenarios)
  conversations: any[] = []; // List of user's conversations
  messages: any[] = []; // Messages in the selected conversation
  selectedConversationId: number | null = null; // Active conversation ID
  newMessageText: string = ''; // Input field for new message
  isLoadingMessages: boolean = false; // Loading state for messages

  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Load conversations when component initializes
    this.loadConversations();

    // Listen for route parameter changes to select conversation dynamically
    this.route.paramMap.subscribe((params) => {
      const conversationId = params.get('id');
      if (conversationId) {
        this.selectConversation(+conversationId); // Load messages for the given conversation ID
      }
    });
  }

  /**
   * Load user's conversations
   */
  loadConversations(): void {
    this.chatService.getUserConversations(this.userId).subscribe({
      next: (data) => {
        this.conversations = data;
      },
      error: (error) => {
        console.error('Error loading conversations:', error);
      },
    });
  }

  /**
   * Handle selecting a conversation
   * @param conversationId ID of the selected conversation
   */
  selectConversation(conversationId: number): void {
    this.selectedConversationId = conversationId;
    this.router.navigate(['/chat', conversationId]); // Update URL
    this.loadMessages();
  }

  /**
   * Load messages for the selected conversation
   */
  loadMessages(): void {
    if (!this.selectedConversationId) return;

    this.isLoadingMessages = true;
    this.chatService.getMessages(this.selectedConversationId).subscribe({
      next: (data) => {
        this.messages = data;
        this.isLoadingMessages = false;
      },
      error: (error) => {
        console.error('Error loading messages:', error);
        this.isLoadingMessages = false;
      },
    });
  }

  /**
   * Send a new message
   */
  sendMessage(): void {
    if (!this.selectedConversationId || !this.newMessageText.trim()) return;

    const messageData = {
      conversationId: this.selectedConversationId,
      text: this.newMessageText.trim(),
    };

    this.chatService.sendMessage(messageData).subscribe({
      next: () => {
        this.newMessageText = ''; // Clear the input
        this.loadMessages(); // Reload messages after sending
      },
      error: (error) => {
        console.error('Error sending message:', error);
      },
    });
  }
}
