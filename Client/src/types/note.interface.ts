export interface INote {
  title: string;
  content: string;
  tags: string[];
  isPinned: boolean;
  userId: string;
  createdOn: string;
}
