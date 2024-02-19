import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Users() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get('http://localhost:8080/api/users');
    setUsers(response.data);
  };

  const addUser = async () => {
    const response = await axios.post('http://localhost:8080/api/users', { name });
    setUsers([...users, response.data]);
    setName('');
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8080/api/users/${id}`);
    fetchUsers();
  };

  const updateUser = async (id) => {
    const newName = prompt('Enter new name');
    if (newName) {
      await axios.put(`http://localhost:8080/api/users/${id}`, { name: newName });
      fetchUsers();
    }
  };




  return (
    <div>
      <h1>Users</h1>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button onClick={addUser}>Add User</button>
      <table class="center">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>
                <button  class="button-23" onClick={() => updateUser(user.id)}>Update</button>
                <button  class="button-24" onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <Link to="/">
        <button class="button-23">Go to mainpage</button>
      </Link>
      
    </div>
  );
}



export default Users;