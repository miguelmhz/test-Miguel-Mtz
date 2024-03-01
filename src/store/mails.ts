import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Email } from '../types';
import { v4 as uuidv4 } from 'uuid';
import {email as emailsTxts} from '../assets/emails/data'

type Store = {
    activeSidebar:boolean,
    emailSelected: Email,
    emails: Email[],
    filterBy:'all' | 'spam' | 'deleted'| undefined,
    addEmail: (email: Email) => void,
    fetchEmails: (limit: number) => Promise<void>,
    setToRead: (id: string) => void,
    setSelected: (id: string) => void,
    setDeleteEmail: (id: string) => void,
    setSpamEmail: (id: string) => void,
    setUnread: (id: string) => void,
    setActiveSidebar: () => void,
    setFilterBy: (value: 'all' | 'spam' | 'deleted'| undefined) => void
}

const API_URL = 'http://localhost:3000/';

export const useEmailStore = create<Store>()(persist((set, get) => {
    return {
        activeSidebar:true,
        filterBy:'all',
        emails: [],
        filterEmails: [],
        emailSelected: {
            id: '',
            from: "",
            to: "",
            subject: "",
            body: "",
            date: "",
            isReaded: false,
            avatar: "",
            tag: "",
            attachements: [],
            isSelected: false,
            isDeleted:false,
            isSpam:false
        },
        fetchEmails: async (limit: number) => {
            const res = await fetch(`${API_URL}/data/mail-data.json`);
            const json = await res.json();

            const emails = json.slice(0, limit);
            set({ emails });
        },
        addEmail: (email: Email) => {
            set((state) => ({ emails: [email, ...state.emails] }));
        },
        setToRead: (id: string) => {
            const { emails } = get();
            const newEmails = [...emails];
            const index = newEmails.findIndex((email) => email.id === id);
            if (index !== -1) {
                newEmails[index].isReaded = true;
                set({ emails: newEmails });
            }
        },
        setSelected: (id: string) => {
            const { emails } = get();
            const newEmails = [...emails];
            const index = newEmails.findIndex((email) => email.id === id);
            if (index !== -1) {
                newEmails.forEach((email) => email.isSelected = false);
                newEmails[index].isSelected = true;
                set({ emails: newEmails, emailSelected: newEmails[index], activeSidebar:false });
            }
        },
        setDeleteEmail:(id: string) => {
            const { emails } = get();
            const newEmails = [...emails];
            const index = newEmails.findIndex((email) => email.id === id);
            if (index !== -1) {
                newEmails[index].isDeleted = true;
                set({ emails: newEmails, filterBy:'deleted'});
            }
        },
        setSpamEmail:(id: string) => {
            const { emails } = get();
            const newEmails = [...emails];
            const index = newEmails.findIndex((email) => email.id === id);
            if (index !== -1) {
                newEmails[index].isSpam = true;
                set({ emails: newEmails, filterBy:'spam'});
            }
        },
        setFilterBy:(value: "all" | "spam" | "deleted" | undefined) => {
            set({ filterBy:value});
        },
        setUnread: (id: string) => {
            const { emails } = get();
            const newEmails = [...emails];
            const index = newEmails.findIndex((email) => email.id === id);
            if (index !== -1) {
                newEmails[index].isReaded = false;
                set({ emails: newEmails});
            }
        },
        setActiveSidebar:()=>{
            const { activeSidebar } = get();
            set({activeSidebar:!activeSidebar})
        }
    };
}, {
    name: 'emails'
}));

setInterval(() => {
    for (let index = 0; index < 2; index++) {
        const newEmail: Email = {
            id: uuidv4(),
            from: "mhallatt0@walmart.com",
            to: "cziem0@surveymonkey.com",
            subject: `Mail test ${Math.floor(Math.random() * 100 + 1)}`,
            body: emailsTxts[Math.floor(Math.random() * 5 )],
            date: "3/31/2017",
            isReaded: false,
            avatar: "https://robohash.org/dignissimosetsuscipit.jpg?size=50x50&set=set1",
            tag: "Indigo",
            attachements: [
                {
                    "file": "http://dummyimage.com/250x250.jpg/5fa2dd/ffffff",
                    "name": "ut_nulla_sed.jpeg"
                }
            ],
            isSelected: false,
            isDeleted:false,
            isSpam:false
        };
        useEmailStore.getState().addEmail(newEmail);
    }
}, 90000); 
