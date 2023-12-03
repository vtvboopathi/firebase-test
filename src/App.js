import './App.css';

import { useState, useEffect } from "react";
import { db } from './firebase'
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore'

function App() {

  const [newName, setNewName] = useState('')
  const [newAge, setNewAge] = useState(0)

  const [users, setUsers] = useState([])
  const usersCollection = collection(db, 'users')

  const createUser = async () =>{
    await addDoc(usersCollection, {name: newName, age: Number(newAge)})
    setNewName('')
    setNewAge('')
  }

  const updateUser = async (id, age) =>{
    const userDoc = doc(db, 'users', id)
    const newFields = {age: age + 1}
    await updateDoc(userDoc, newFields)
  }

  const deleteuser = async (id) =>{
    const userDoc = doc(db, 'users', id)
    await deleteDoc(userDoc)
  }

  useEffect (()=>{
    const getUsers = async () =>{
      const data = await getDocs (usersCollection)
      setUsers(data.docs.map((doc)=> ({...doc.data(), id:doc.id})))
    }
    getUsers()
  }, [])

  return(
    <div className='hero'>
      <input type='text' placeholder='Name...' onChange={(event)=> setNewName(event.target.value)}/>
      <input type='number' placeholder='Age' onChange={(event)=> setNewAge(event.target.value)}/>
      <button onClick={createUser}>Create User</button>
      {users.map((user)=>{
        return(
          <div className='hero'>
            <h1>{user.name}</h1>
            <h1>{user.age}</h1>
            <div className='btn-div'>
            <button onClick={()=> {updateUser(user.id, user.age)}}>Update Age</button>
            <button onClick={()=> {deleteuser(user.id)}}>Delete User</button>
            </div>
          </div>
        )
      })}
    </div>
  )
       
}


export default App;
