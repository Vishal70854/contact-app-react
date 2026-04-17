import React , {useRef} from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";
const ContactList = (props) => {
    // console.log(props);
    const inputEl = useRef("");

    const deleteContactHandler = (id) => {
        props.getContactId(id); // pass this id to getContactId(id) in App.js(App.js is parent compenent here) which is removeContactHandler(id) in App.js (i.e passing data from subchild->child->parent)
    }
    const renderContactList = props.contacts.map((contact) => {
        return (
            <ContactCard contact = {contact} clickHandler = {deleteContactHandler} key={contact.id}/> // pass the deleteContactHandler as clickHandler props to child i.e ContactCard component 
        );
    })

    const getSearchTerm = () => {
        props.searchKeyword(inputEl.current.value);
    }

    return (
        <div className="ui container" style={{ marginTop: "80px" }}>
        <h2 style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>Contact List
            <Link to="/add">
                <button className="ui button blue right" style={{flex: "1"}}>Add Contact</button>
            </Link>
        </h2>
        <div className="ui search">
            <div className="ui icon input">
                <input 
                    ref={inputEl}
                    type="text" 
                    placeholder="Search Contacts" 
                    className="prompt"
                    value={props.term}
                    onChange={getSearchTerm}
                    />
                <i className="search icon" />
            </div>
        </div>
        <div className="ui celled list"> {renderContactList.length > 0 ? renderContactList : "No Contacts Available !!"} </div>
        </div>
    );
}

export default ContactList;