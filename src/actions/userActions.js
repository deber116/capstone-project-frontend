export const signIn = user => {
    return {
      type: 'SIGN_IN',
      username: user.username,
      token: user.jwt,
      userId: user.id
    };
};

export const logout = user => {
  return {
    type: 'LOGOUT',
  };
};