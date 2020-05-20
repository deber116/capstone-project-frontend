export const signIn = user => {
    return {
      type: 'SIGN_IN',
      username: user.user.username,
      token: user.jwt,
      userId: user.user.id
    };
};

export const logout = user => {
  return {
    type: 'LOGOUT',
  };
};