import React, {useState} from 'react';
import Form from './components/Form';
import SubmissionList from './components/SubmissionList';
import './index.css';
import UserInfo from './interfaces/UserInfo';
import CatDisplay from './components/CatDisplay';

const initialUserList:Array<UserInfo> = [];

function App() {
  const [userList, setUserList] = useState<Array<UserInfo>>([...initialUserList]);

  const addUser = (userInfo:UserInfo) => {
    setUserList(prevUserList => [...prevUserList, userInfo])
  }

  const removeUser = (ind:number) => {
    setUserList(prevUserList => prevUserList.filter((_,index) => index!==ind))
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="w-11/12 justify-center items-center">
        <h1 className="text-center text-4xl font-bold my-6">Add Users</h1>
        <div className="flex">
            <Form addUser={addUser}/>
            <SubmissionList userList={userList} removeUser={removeUser}/>
        </div>
      </div>
      <CatDisplay />
    </div>
  );
}

export default App;
