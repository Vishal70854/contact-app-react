import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import './App.css';
import Header from './components/Header';
import AddContact from './components/AddContact';
import ContactList from './components/ContactList'; 
import ContactDetail from './components/ContactDetail'; 

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);

  const addContactHandler = (contact) => {
    console.log(contact);
      const newContact = {
      id: uuidv4(),
      ...contact
    };
    setContacts([...contacts, newContact]); // add new contact object to the previous contacts array
  }

  // delete contact function
  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    //update the contacts state
    setContacts(newContactList);
  }

  // retrieve contacts data from localstorage
  useEffect(() => {
    const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)); // retrieve contacts details in localstorage
    if(retrieveContacts){
      setContacts(retrieveContacts);  // if data is there then update the contacts using setContacts(retrieveContacts)
    }
  }, []); // useEffect dependency array [] consists of empty array, that means app renders only once


  // save contacts array to localStorage
  useEffect(() => {
    if(contacts.length > 0){
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts)); // save contacts details in localstorage using useEffect hook(still on page reload data in not saved in localstorage)
    }  
  }, [contacts]); // useEffect dependency array [contacts] consists of contacts, that means whenever contact changes app re-renders

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Routes>
          <Route 
            path="/add" 
            element={<AddContact addContactHandler={addContactHandler} />} 
          />
          <Route 
            path="/" 
            element={
              <ContactList 
                contacts={contacts} 
                getContactId={removeContactHandler} 
              />
            } 
          />
          <Route 
            path="/contact/:id" 
            element={<ContactDetail />} 
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
