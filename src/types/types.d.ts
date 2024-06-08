export namespace Types {
  type User = {
    id: number;
    email: string;
    nickname: string;
  };

  type Document = {
    id: string;
    title: string;
    author: string;
    authorEmail: string;
    authorId: number;
    createdAt: string;
    lastEditedAt: string;
    sharedUsers: User[];
  };

  type DocumentContent = {
    id: string;
    title: string;
    content: string;
  };

  type Notification = {
    id: number;
    senderId: number;
    senderEmail: string;
    senderNickname: string;
    recipientId: number;
    delivered: boolean;
    createdAt: string;
    type: string;
  };
}