export const loginInApi = async data => {
  try {
    let res = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: data.username,
        password: data.password,
        // expiresInMins: 60, // optional
      }),
    });
    let user = await res.json();
    return {
      isError: false,
      user,
    };
  } catch (error) {
    return {
      isError: false,
      error,
    };
  }
};
