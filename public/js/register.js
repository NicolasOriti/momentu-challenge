const formRegister = document.getElementById('register');
const registerInputs = document.querySelectorAll('#register input');

formRegister.addEventListener('submit', async (e) => {
  e.preventDefault();
  const { user } = await registerPostData('http://localhost:8080/api/users');
  // console.log(user);
  alert(`El usuario ${user.username}`);
  if (user) {
    registerInputs.forEach((input) => {
      if (input.value) {
        input.value = '';
      }
    });
  }
});

async function registerPostData(url = '') {
  const data = {
    name: '',
    email: '',
    username: '',
    password: '',
  };
  registerInputs.forEach((input) => {
    if (input.value) {
      data[input.name] = input.value;
    } else {
      alert(`Te falto completar el campo ${input.name}`);
      throw new Error(`you didn't complete form`);
    }
  });

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}
