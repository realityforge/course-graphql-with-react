import React from 'react';
import requireAuth from './requireAuth';

const Welcome = () => <h1>Welcome</h1>;

export default requireAuth( Welcome );
