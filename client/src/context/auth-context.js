import React from 'react';

export default React.createContext({
    token: null,
    userId: null,
    userRole: null,
    login: (token, userId, userRole, tokenExpiration) => {},
    logout: () => {}
});