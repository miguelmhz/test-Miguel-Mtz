import  '../assets/styles/details.scss'
import { GoPaperclip } from 'react-icons/go'
import { useEmailStore } from '../store/mails'
import { useState } from 'react';
import Modal from './Modal';

export const Details = () => {
  const {emailSelected, setDeleteEmail, setSpamEmail, setUnread, activeSidebar} =useEmailStore();
  //const {file, name}= emailSelected.attachements[0]
  
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div className={`details animate__animated animate__faster ${activeSidebar? '':'active animate__fadeInRight '}`}>
      {
        emailSelected.attachements.length >0 && 
        <>
          <header>
        <div className="actions">
          <button className='btn red' 
            onClick={()=>setDeleteEmail(emailSelected.id)}
          >Delete</button>
          <button className='btn gray'
             onClick={()=>setSpamEmail(emailSelected.id)}
          >Spam</button>
        </div>
        <div className="unread">
          <button onClick={()=>setUnread(emailSelected.id)} className='btn blue'>Mark as unread</button>
        </div>
      </header>
      <hr />
      <main>
        <h2>{emailSelected.subject}</h2>
        <div className="tags">
          <span>Tags</span>
          {
            typeof emailSelected.tag === 'object'?
            emailSelected.tag.map((t, index) => (
              <span key={index} className='tag'>{t}</span>
              ))
              :
              <span className='tag'>{emailSelected.tag}</span>
          }
        </div>
        <div className="body">
          {emailSelected.body}
        </div>
        <div className="replay">
          {emailSelected.attachements && emailSelected.attachements.length > 0 && <div onClick={openModal}><GoPaperclip /></div>  }
          <button onClick={()=>alert('Respuesta enviada')} className='btn blue'>Replay</button>
        </div>
      </main>
      <Modal isOpen={modalOpen} onClose={closeModal}>

        <img 
        src={emailSelected && emailSelected.attachements[0] && emailSelected.attachements[0].file} 
        alt={emailSelected && emailSelected.attachements[0] && emailSelected.attachements[0].name} />
      </Modal>
        </>
        
      }
      
    </div>
  )
}
