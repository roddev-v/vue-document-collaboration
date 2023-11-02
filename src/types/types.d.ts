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
    createdAt: Date;
    sharedUsers: User[];
  };
}
