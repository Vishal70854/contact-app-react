import React from "react";
import user from "../images/user.png";

const ContactCard = (props) => {
    const {id, name, email} = props.contact;
    return (
        <div className="item" style={{ display: "flex", alignItems: "center" }}>
                <img className="ui avatar image" src={user} alt="user" />
                
                <div className="content" style={{ flex: "1", marginLeft: "10px" }}>
                    <div className="header">{name}</div>
                    <div>{email}</div>
                </div>

                <i 
                className="trash alternate outline icon" 
                style={{ color: "red", cursor: "pointer" }}></i>
    </div>
    );
}

export default ContactCard;