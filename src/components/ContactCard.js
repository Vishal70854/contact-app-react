import React from "react";
import { Link } from "react-router-dom";
import user from "../images/user.png";

const ContactCard = (props) => {
    const { id, name, email } = props.contact;

    return (
        <div className="item" style={{ display: "flex", alignItems: "center" }}>
            <img className="ui avatar image" src={user} alt="user" />

            <div className="content" style={{ flex: "1", marginLeft: "10px" }}>
                <Link to={`/contact/${id}`} state={{ contact: props.contact }}>
                    <div className="header">{name}</div>
                    <div>{email}</div>
                </Link>
            </div>

            <i
                className="trash alternate outline icon"
                style={{ color: "red", cursor: "pointer" }}
                onClick={() => props.clickHandler(id)}
            ></i>
        </div>
    );
};

export default ContactCard;