import React from "react";
import {Link} from "react-router-dom";


/**
 * @constructor UserList react component that uses the findAllUsers
 * service to retrieve all the users in the database and render them
 * @returns {JSX.Element}
 */
export const UserList = ({users, deleteUser}) => {
  return (
    <div className="list-group">
      {
        users.map(user => {
          return (
            <Link className="list-group-item"
                  key={user._id}
                  to={`/home/${user._id}`}>
          <span className="fs-3">
            {user.username}
          </span>
              <button onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                deleteUser(user._id)
              }} className="btn btn-danger fa-pull-right">
                <i className="fas fa-remove"></i>
              </button>
            </Link>
          )
        })
      }
    </div>)
};
