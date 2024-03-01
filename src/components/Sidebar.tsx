import { useEffect, useState } from 'react';
import { MdOutlineMenu } from "react-icons/md";
import '../assets/styles/sidebar.scss'
import { useEmailStore } from '../store/mails';
import { MailCard } from './MailCard'
import { Email } from '../types';

export const Sidebar = () => {
    const [unreadEmails, setUnreadEmails] = useState(0)
    const [filteredEmails, setFilteredEmails] = useState<Email[]>([]);
    const { emails, fetchEmails, filterBy, setFilterBy, activeSidebar, setActiveSidebar } = useEmailStore();

    const countUnreadEmails = () => {
        setUnreadEmails(emails.filter((email) => !email.isReaded).length)
    }

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const filterEmails = emails.filter((email) => email.subject.toLowerCase().includes(value.toLowerCase()));
        setFilteredEmails(filterEmails)
    };
    const handleFilter = (value:"all" | "spam" | "deleted") => {
        console.log({ value })
        switch (value) {
            case 'spam':
                const spamEmails = emails.filter((email) => email.isSpam);
                setFilteredEmails(spamEmails)
                setFilterBy(value)
                break;
            case 'deleted':
                const deletedEmails = emails.filter((email) => email.isDeleted);
                setFilteredEmails(deletedEmails)
                setFilterBy(value)
                break;

            default:
                const allEmails = emails.filter((email) => !email.isDeleted && !email.isSpam);
                setFilteredEmails(allEmails)
                setFilterBy("all")
                break;
        }

    };

    useEffect(() => {
        countUnreadEmails()

        if (emails.length === 0) {
            fetchEmails(2)
            handleFilter('all')
        }

    }, [emails])
    useEffect(() => {
        if (filterBy) {
            handleFilter(filterBy)
        }

    }, [filterBy,emails])

    return (
        <>
            <div className={`sidebar  animate__animated animate__faster ${activeSidebar? 'active animate__fadeInLeft ' : 'animate__fadeInRight'}`}>
                <header>
                    <h1 className="title">
                        Inbox
                        {unreadEmails > 0 && <span key={unreadEmails} className='animate__animated animate__bounce notification'>{unreadEmails}</span>}
                    </h1>
                    <div className="filterBy-selector">
                        <select value={filterBy} onChange={(e:any)=>handleFilter(e.target.value)} name="filter" id="filter">
                            <option value="all">Bandeja de entrada</option>
                            <option value="spam">Correo no deseado</option>
                            <option value="deleted">Correos eliminados</option>
                            {/* bandeja de entrada, el correo no deseado y los correos electrónicos eliminados */}
                        </select>
                    </div>
                </header>
                <hr />
                <section className="search-bar">
                    <input onChange={handleSearch} placeholder='Search' type="search" name="search" id="search" />
                </section>
                <main>
                    {
                        filteredEmails.length > 0 ?
                            filteredEmails.map((email) => (
                                <MailCard
                                    key={email.id}
                                    attachments={email.attachements}
                                    date={email.date}
                                    subject={email.subject}
                                    body={email.body}
                                    isReaded={email.isReaded}
                                    isSelected={email.isSelected}
                                    id={email.id}
                                />
                            ))
                            :
                            <div className="no-emails">
                                <span>No hay email por mostrar</span>
                            </div>
                    }
                </main>
            </div>
            <div onClick={setActiveSidebar} className={`menu-icon ${activeSidebar? '' : 'active'}`}>
                <MdOutlineMenu/>
            </div>
        </>
    )
}
