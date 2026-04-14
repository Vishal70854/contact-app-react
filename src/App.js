import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import AddContact from './components/AddContact';
import ContactList from './components/ContactList'; 

function App() {
  const contacts = [
    {
      id: "1",
      name: "Vishal",
      email: "vishal@gmail.com"
    },
    {
      id: "2",
      name: "Vicky",
      email: "vicky@gmail.com"
    }
  ];
  return (
    <div className="ui container">
      <Header/>
      <AddContact/>
      <ContactList contacts = {contacts}/>
    </div>
  );
}

export default App;
