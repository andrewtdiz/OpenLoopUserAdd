import React from 'react'
import UserInfo from '../interfaces/UserInfo';

interface SubmissionListProps {
  userList: Array<UserInfo>,
  removeUser: (userIndex:number) => void
}

export default function SubmissionList({userList, removeUser}:SubmissionListProps) {
    return (
      <div className="flex-1 px-4 flex flex-col">
        <ul className="list-inside list-disc">
          {userList.length>0 
            ? userList.map((user:UserInfo, ind:number) => (
                <li key={user.firstName+user.email+ind}>
                  {Object.values(user).map((value:string) => value+" | ")}
                  <button className="inline button mt-2" onClick={() => removeUser(ind)}>Remove</button>
                </li>
              ))
            : <li>No users yet...</li>}
        </ul>
      </div>
    )
}
