//configuração firebase
const firebaseConfig = {
  apiKey: "AIzaSyBWYed6XE2-YW_Aj2udOY7UIAW_1Y3fegY",
  authDomain: "cassineiro-70605.firebaseapp.com",
  projectId: "cassineiro-70605",
  storageBucket: "cassineiro-70605.appspot.com",
  messagingSenderId: "987748691719",
  appId: "1:987748691719:web:37cd6b2b4ba28c74261fa2",
  measurementId: "G-SXSLJK930J"
};


firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Cadastrar usuário
const registerBtn = document.getElementById('register-btn');
registerBtn.addEventListener('click', function () {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const username = document.getElementById('username').value;

  // Verificar se os campos estão preenchidos
  if (email === '' || password === '' || username === '') {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('Usuário cadastrado:', user.email, username);
      alert('Cadastro realizado com sucesso!');

      window.location.href = '../login/login.html';
    })
    .catch((error) => {
      console.log('Erro ao cadastrar usuário:', error.code, error.message);
      if (error.code === 'auth/email-already-in-use') {
        alert('Esse email já está em uso. Faça login ou use outro email para se cadastrar.');
      } else {
        alert('Ocorreu um erro ao cadastrar usuário. Tente novamente mais tarde.');
      }
    });
});


const googleSignupButton = document.getElementById('googleSignupButton');
googleSignupButton.addEventListener('click', () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      console.log('User cadastrado com o google', user);

      window.location.href = 'home/home.html';
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('Erro no cadastro com o google: ', errorCode, errorMessage);
    });
});
