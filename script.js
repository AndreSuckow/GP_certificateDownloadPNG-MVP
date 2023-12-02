/* parte 1 : intro */

// colocar como false após o layout customizado.
let isVisible = false;

// valida os dados do input
function validateName() {
  let inputUser = document.getElementById("inputUser");
  let name = inputUser.value;
  let minCharacters = 3;
  let maxCharacters = 40;
  let hasNumber = /\d/.test(name);
  let hasSymbol = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\]/.test(name);

  if (
    name.length > maxCharacters ||
    name.length < minCharacters ||
    hasNumber ||
    hasSymbol
  ) {
    let errorMsg = document.getElementsByClassName("error")[0];
    errorMsg.style.opacity = "1";
    inputUser.value = "";
  } else {
    // Uppercase em iniciais dos nomes
    name = name.toLowerCase().replace(/\b\w/g, function (char) {
      return char.toUpperCase();
    });

    inputUser.value = name;
    return name;
  }
}

// insere o nome do usuário dentro do certificado
function insertUserName() {
  let checkedName = validateName();
  if (!checkedName) {
    return checkedName;
  }
  const userNameElements = document.querySelectorAll(".userName");
  userNameElements.forEach((element) => {
    element.textContent = checkedName;
  });

  return checkedName;
}

/* parte 2: content download */

// Libera visualização do conteúdo que será printado para o prog montar o layout

if (isVisible) {
  showLayoutCertificate();
} else {
  console.log(
    "layout bloqueado, desbloqueie setando a variável isVisible para true"
  );
}

function showLayoutCertificate() {
  document.getElementById("intro").style.display = "none";
  document.getElementsByTagName("body")[0].style.overflow = "auto";
}

// captura a tela ao clicar no botão
let certificateButton = document.getElementById("certificateButton");
certificateButton.addEventListener("click", () => {
  var name = insertUserName();

  // Verifica se a validação do nome foi bem-sucedida antes de capturar a tela
  if (name) {
    captureScreen();
  } else {
    console.log(
      "A validação do nome falhou. Não foi possível capturar a tela."
    );
  }
});

function captureScreen() {
  html2canvas(document.querySelector("#contentDownload"), {
    onclone: (cloneDom) => {
      let contentDown = cloneDom.getElementById("contentDownload");
      contentDown.style.display = "flex";
      contentDown.style.width = "120rem"; //1920px
    },
  }).then(function (canvas) {
    saveScreenshot(canvas);
  });
}

function saveScreenshot(canvas) {
  const fileName = `certificado`;
  const link = document.createElement("a");
  link.download = fileName + ".png";
  canvas.toBlob(function (blob) {
    link.href = URL.createObjectURL(blob);
    document.body.appendChild(link);
    link.click();
  });
}

document
  .querySelector("#downloadButton")
  .addEventListener("click", captureScreen);
