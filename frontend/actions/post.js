export function postLogin(message){
  const loginUrl = '';
  fetch(loginUrl, { method:'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ username: message[0], password: message[1] })
    .then((res) => {
      console.log(res).
    });
  });
}

export function postRegister(message){
  const registerUrl = '';
  fetch(registerUrl, { method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ username: message[0], password: message[1], name: message[2]})
    .then((res) => {
      console.log(res);
    });
  });
}
