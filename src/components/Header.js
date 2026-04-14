import React from "react";

const Header = () => {
    return (
        <div className="ui fixed menu">
            <div className="ui container">
                <div className="item" style={{ width: "100%", justifyContent: "center", display: "flex" }}>
                    <h2>Contact Manager</h2>
                </div>
            </div>
        </div>
    );
};

export default Header;