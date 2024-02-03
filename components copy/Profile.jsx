import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

const Profile = ({ token }) => {
const { user, isAuthenticated, isLoading } = useAuth0();



  return (
    isLoading ? <div>Loading ...</div> :
    <div className='bg-blue-200 w-full flex flex-col p-2'>
        <h1 className='text-xl font-semibold'>Perfil</h1>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      {/* Display other user data as needed */}
    </div>
  );
};

export default Profile;