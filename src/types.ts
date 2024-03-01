interface Attachment {
    file: string;
    name: string;
  }
  
export interface Email {
    id: string,
    from: string;
    to: string;
    subject: string;
    body: string;
    date: string;
    isReaded: boolean;
    avatar: string;
    tag: string[] | string;
    attachements: Attachment[];
    isSelected:boolean 
    isSpam:boolean
    isDeleted:boolean
}