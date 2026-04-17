import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import './App.css';
import Header from './components/Header';
import AddContact from './components/AddContact';
import ContactList from './components/ContactList'; 
import ContactDetail from './components/ContactDetail'; 
import api from './api/contacts';
import { all } from 'axios';
import EditContact from './components/EditContact';

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);


  // retrieve Contacts
  const retrieveContacts = async () => {
    const response =  await api.get("/contacts"); // get call to fetch contacts array from json-server fake api
    return response.data;
  }
 
  const addContactHandler = async (contact) => {
    console.log(contact);

      const request = {
      id: uuidv4(),
      ...contact
    };
    // post api call to add a new contact to the json-server fake api and pass the request as input to the fake api
    const response = await api.post("/contacts", request);
    setContacts([...contacts, response.data]); // add new contact object to the previous contacts array
  }

  // update contact function
  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact); // update contact by passing updated contacts data 
    const {id, name, email} = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? {...response.data} : contact;
      })
    );
  }

  // delete contact function
  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);  // delete contact with id from fake-api
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    //update the contacts state
    setContacts(newContactList);
  }

  // retrieve contacts data from localstorage
  useEffect(() => {
    // const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)); // retrieve contacts details in localstorage
    // if(retrieveContacts){
    //   setContacts(retrieveContacts);  // if data is there then update the contacts using setContacts(retrieveContacts)
    // }

    // get contacts from json-server fake api using axios, async, await
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts(); // call the retrieve contacts method for fetching contacts array
      if(allContacts)
        setContacts(allContacts); // save contacts state using useState(allContacts) if contacts data is fetched from api json-server
    }

    // call getAllContacts() function
    getAllContacts();
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
            path="/edit" 
            element={<EditContact updateContactHandler={updateContactHandler} />} 
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
