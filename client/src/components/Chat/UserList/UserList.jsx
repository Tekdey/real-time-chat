import React from "react";
import "./UserList.css"

const UserList = ({users}) => {

    


  return <div className="userlist__container">
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
