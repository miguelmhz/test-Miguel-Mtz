import { GoPaperclip } from "react-icons/go";
import  '../assets/styles/mailCard.scss'
import { useEmailStore } from "../store/mails";

interface Attachment {
    file: string;
    name: string;
  }
  

interface MailProps {
    id:string
    subject: string, 
    date: string, 
    body: string, 
    isReaded: boolean, 
    attachments?: Attachment[] ;
    isSelected:boolean
}

export const MailCard = ({subject, date, body, isReaded,isSelected, attachments, id}:MailProps ) => {
  
  const { setToRead, setSelected } = useEmailStore();
  const handeledChangeState = (): void => {
    console.log({id})
    setToRead(id);
    setSelected(id);
  }
  

  return (
    <div 
      onClick={()=>handeledChangeState()} 
      className={ 
        `mail-card ${isReaded? 'read' : ''} 
        ${isSelected? 'selected' : ''} 
        ${!isReaded? 'animate__animated animate__fadeInDown animate__fast':''}
        `
        }>
        <div className="body">
            <h2>{subject}</h2>
            <p>{body.substring(0,25).trim()+"..."}</p>
        </div>
        <div className="info">
            <span>{date}</span>
            {attachments && attachments.length > 0 && <GoPaperclip />  }
        </div>
    </div>
  )
}
