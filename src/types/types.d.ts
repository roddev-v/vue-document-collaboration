export namespace Types {
  type User = {
    id: number;
    email: number;
    nickname: number;
  };

  type Document = {
    id: string;
    title: string;
    author: string;
    authorEmail: string;
    authorId: number;
    createdAt: string;
    sharedUsers: User[];
  };
}


/**
 * private Long id;
    private Long senderId;
    private String senderEmail;
    private String senderNickname;

    private String documentId;

    private Long recipientId;
    private Boolean delivered;

    private String title;
    private String content;

    private String createdAt;
 */