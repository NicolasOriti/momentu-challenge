const formLogin = document.getElementById('login');
const loginInputs = document.querySelectorAll('#login input');

formLogin.addEventListener('submit', async (e) => {
  e.preventDefault();
  const response = await loginPostData('http://localhost:8080/api/auth/login');
  console.log(response);
  if (response.token) {
    loginInputs.forEach((input) => {
      if (input.value) {
        input.value = '';
      }
    });
    location.replace('products.html');
  }
});

async function loginPostData(url = '') {
  const data = {
    email: '',
    password: '',
  };
  loginInputs.forEach((input) => {
    if (input.value) {
      data[input.name] = input.value;
    } else {
      alert(`Te falto completar el campo ${input.name}`);
      throw new Error(`you didn't complete login`);
    }
  });

  console.log('Esta es la data', data);
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}
