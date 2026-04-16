import React from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";
const ContactList = (props) => {

    const deleteContactHandler = (id) => {
        props.getContactId(id); // pass this id to getContactId(id) in App.js(App.js is parent compenent here) which is removeContactHandler(id) in App.js (i.e passing data from subchild->child->parent)
    }
    const renderContactList = props.contacts.map((contact) => {
        return (
            <ContactCard contact = {contact} clickHandler = {deleteContactHandler} key={contact.id}/> // pass the deleteContactHandler as clickHandler props to child i.e ContactCard component 
        );
    })

    return (
        <div className="ui container" style={{ marginTop: "80px" }}>
        <h2>Contact List</h2>
        <Link to="/add">
            <button className="ui button blue right">Add Contact</button>
        </Link>
        
        <div className="ui celled list"> {renderContactList} </div>
        </div>
    );
}

export default ContactList;