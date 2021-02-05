import React, {useState} from 'react';
import Form from './components/Form';
import SubmissionList from './components/SubmissionList';
import './index.css';

function App({initialUserList = []}:any) {
  const [userList, setUserList] = useState<Array<any>>([...initialUserList]);

  const addUser = (userInfo:any) => {
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
    </div>
  );
}

export default App;
