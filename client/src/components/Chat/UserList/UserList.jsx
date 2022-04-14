import React from "react";
import "./UserList.css"

const UserList = ({users}) => {


  return <div className="userlist__container">
    <h4>Users in current room</h4>
      <ul>
        {
            users.map((data, i) => {
              return (
                <li key={i}>
                  {data.name}
                </li>
              )

            })
          }
      </ul>
  </div>
};

export default UserList;
