import React, {useState} from 'react';
import Form from './components/Form';
import UserTable from './components/UserTable';
import './index.css';

function App() {
  const [userList, setUserList] = useState<Array<any>>([]);

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
            <UserTable userList={userList} removeUser={removeUser}/>
        </div>
      </div>
    </div>
  );
}

export default App;
