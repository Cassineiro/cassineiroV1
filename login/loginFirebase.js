
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

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("senha").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const welcomeMessage = `Bem-vindo(a) de volta!`;
      alert(welcomeMessage);
      window.location.href = "../home/home.html";
    })
    .catch((error) => {
      console.log('Erro ao realizar o login:', error.code, error.message);
      alert("Falha ao realizar o login, tente novamente.");
    });
}
//login com o Google
const googleSignupButton = document.getElementById('googleSignupButton');
googleSignupButton.addEventListener('click', () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      console.log('User cadastrado com o google', user);

      window.location.href = '../home/home.html';
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('Erro no cadastro com o google: ', errorCode, errorMessage);
    });
});