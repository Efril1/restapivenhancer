import React from 'react';
import { Link } from 'react-router-dom';

function MainPage() {
  return (
    <div>
      <h1>Main Page</h1>
      <br></br>
      <Link to="/users">
        <button class="button-23">Go to Users</button>
      </Link>
      <br />
      <br />
      <Link to="/chat">
        <button class="button-23">Go to Chat</button>
      </Link>
    </div>

    
  );
}

export default MainPage;