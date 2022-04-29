import React from "react";

const UserList = ({users}) => {


  return <div className="h-full  bg-gray-900 text-blue-300">
    <h4 className="text-center text-lg">Users</h4>
      <ul className="bg-gray-900">
        {
            users.map((data, i) => {
              return (
                <li key={i} className="hover:bg-gray-800 ">
                  {data.name}
                </li>
              )

            })
          }
      </ul>
  </div>
};

export default UserList;
