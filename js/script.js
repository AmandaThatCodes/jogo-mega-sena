//fn + f2 = renomeia o termo em todos os lugares
//o state é um objeto que representa o estado da aplicação
var state = { board: [], currentGame: [], savedGames: [] };

function start() {
  createBoard();
  newGame();
}

function createBoard() {
  //esse [] vazio significa que zera o estado
  state.board = [];

  //o computador vai preencher automaticamente de 1 a 60
  for (var i = 1; i <= 60; i++) {
    //se fosse fazer manualmente, no lugar de i você colocava o número 1, depois na outra linha o número 2 e por aí vai
    state.board.push(i);
  }
}

//a função newGame vai zerar o jogo
function newGame() {
  resetGame();
  render();

  console.log(state.currentGame);
}

function render() {
  renderBoard();
  renderButtons();
  renderSavedGames();
}

function renderBoard() {
  //o # linka com o HTML
  var divBoard = document.querySelector('#megasena-board');
  //''; o HTML interno dela vai ser vazio, pois vai ser feito várias vezes
  divBoard.innerHTML = '';

  var ulNumbers = document.createElement('ul');
  //não preciso colocar .numbers porque o JS já entende que é uma classe pelo classList
  ulNumbers.classList.add('numbers');

  //.length = percorre o tamanho dele. Vai de 1 até 60.
  for (var i = 0; i < state.board.length; i++) {
    var currentNumber = state.board[i];

    var liNumber = document.createElement('li');
    liNumber.textContent = currentNumber;
    liNumber.classList.add('number');

    //para algo acontecer quando o número for clicado
    liNumber.addEventListener('click', handleNumberClick);

    if (isNumberInGame(currentNumber)) {
      //se o número estiver no jogo, ele vai ser selecionado
      liNumber.classList.add('selected-number');
    }

    ulNumbers.appendChild(liNumber);
  }

  //faz com que os números apareçam na tela
  divBoard.appendChild(ulNumbers);
}

//quando o usuário clicar em um número da tela
function handleNumberClick(event) {
  //o Number vai converter o textContent em número
  var value = Number(event.currentTarget.textContent);

  if (isNumberInGame(value)) {
    removeNumberFromGame(value);
  } else {
    addNumberToGame(value);
  }

  console.log(state.currentGame);
  render();
}

function renderButtons() {
  var divButtons = document.querySelector('#megasena-buttons');
  divButtons.innerHTML = '';

  var buttonNewGame = createNewGameButton();
  var buttonRandomGame = createRandomGameButton();
  var buttonSaveGame = createSaveGameButton();

  //conecta com a função lá embaixo
  divButtons.appendChild(buttonNewGame);
  divButtons.appendChild(buttonRandomGame);
  divButtons.appendChild(buttonSaveGame);
}

function createRandomGameButton() {
  var button = document.createElement('button');
  button.textContent = 'Jogo aleatório';

  button.addEventListener('click', randomGame);

  return button;
}

function createNewGameButton() {
  //criando um botão
  var button = document.createElement('button');
  button.textContent = 'Novo jogo';

  button.addEventListener('click', newGame);

  return button;
}

function createSaveGameButton() {
  var button = document.createElement('button');
  button.textContent = 'Salvar jogo';
  //o botão só fica habilitado quando o jogo está completo
  button.disabled = !isGameComplete();

  button.addEventListener('click', saveGame);

  return button;
}

function renderSavedGames() {
  var divSavedGames = document.querySelector('#megasena-saved-games');
  divSavedGames.innerHTML = '';

  if (state.savedGames.length === 0) {
    divSavedGames.innerHTML = '<p>Nenhum jogo salvo</p>';
  } else {
    var ulSavedGames = document.createElement('ul');

    for (var i = 0; i < state.savedGames.length; i++) {
      var currentGame = state.savedGames[i];

      var liGame = document.createElement('li');
      //o join acrescentou um espaço ', ' antes de mostrar o jogo
      liGame.textContent = currentGame.join(', ');

      ulSavedGames.appendChild(liGame);
    }

    divSavedGames.appendChild(ulSavedGames);
  }
}

function addNumberToGame(numberToAdd) {
  if (numberToAdd < 1 || numberToAdd > 60) {
    //ou seja, não pode ter nenhum número menor que 1 ou maior que 60
    console.error('Número inválido', numberToAdd);
    //sempre coloca return pra poder sair da função depois
    return;
  }

  if (state.currentGame.length >= 6) {
    //não pode selecionar mais que 6 números senão dá erro
    console.error('O jogo já está completo.');
    return;
  }

  if (isNumberInGame(numberToAdd)) {
    console.error('Este número já está no jogo.', numberToAdd);
    return;
  }

  state.currentGame.push(numberToAdd);
}

function removeNumberFromGame(numberToRemove) {
  if (numberToRemove < 1 || numberToRemove > 60) {
    console.error('Número inválido', numberToRemove);
    return;
  }

  var newGame = [];

  //aqui a variável percorre todos os números
  for (var i = 0; i < state.currentGame.length; i++) {
    var currentNumber = state.currentGame[i];

    //se eu cheguei no número que eu quero remover/não selecionar mais === continue
    if (currentNumber === numberToRemove) {
      continue;
    }

    //aí pede pra adicionar um novo número
    newGame.push(currentNumber);
  }

  state.currentGame = newGame;
}

function isNumberInGame(numberToCheck) {
  // if (state.currentGame.includes(numberToCheck)) {
  //   return true;
  // }

  // return false;

  //na expressão a seguir, se o número já existir, vai retornar com erro. Se não existir, vai retornar com true
  return state.currentGame.includes(numberToCheck);
}

function saveGame() {
  //com o ! na frente significa que o jogo não está completo
  if (!isGameComplete()) {
    //colocando o .error, o número não é adicionado e um erro é aplicado
    console.error('O jogo não está completo!');
    return;
  }

  state.savedGames.push(state.currentGame);
  newGame();

  console.log(state.savedGames);
}

function isGameComplete() {
  //como sei que o jogo está completo? Quando há 6 números selecionados
  return state.currentGame.length === 6;
}

//para zerar o jogo
function resetGame() {
  state.currentGame = [];
}

//a função é zerar o jogo
function randomGame() {
  resetGame();

  //enquanto o jogo não estiver completo, crie um número aleatório e complete
  while (!isGameComplete()) {
    //o ceil arredonda pra cima
    var randomNumber = Math.ceil(Math.random() * 60);
    addNumberToGame(randomNumber);
  }

  console.log(state.currentGame);
  render();
}

start();
