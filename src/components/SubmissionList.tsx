import React from 'react'

export default function SubmissionList({userList, removeUser}:any) {
    return (
      <div className="flex-1 px-4 flex flex-col">
        <ul className="list-inside list-disc">
          {userList.length>0 
            ? userList.map((user:any, ind:any) => (
                <li key={user.name+user.email+ind}>
                  {Object.values(user).map(value => value+" | ")}
                  <button className="inline button mt-2" onClick={() => removeUser(ind)}>Remove</button>
                </li>
              ))
            : <li>No users yet...</li>}
        </ul>
      </div>
    )
}
