// Permitir que os elementos possam ser soltos
function allowDrop(event) {
  event.preventDefault();
}

// Função chamada quando o item começa a ser arrastado
function drag(event) {
  event.dataTransfer.setData("imageId", event.target.id);
}

// Função para soltar a imagem na área designada
function drop(event) {
  event.preventDefault();
  var imageId = event.dataTransfer ? event.dataTransfer.getData("imageId") : event.target.id;
  var droppedElement = document.getElementById(imageId);

  // Verificar se a imagem solta corresponde ao ID correto
  if (checkAnswer(imageId, event.target.id)) {
    var dropArea = event.target;

    // Criar um contêiner para manter o texto e a imagem separadamente
    var textContent = dropArea.innerHTML;
    dropArea.innerHTML = "";

    var textElement = document.createElement("p");
    textElement.innerHTML = textContent;
    dropArea.appendChild(textElement);

    dropArea.appendChild(droppedElement); 

    throwConfetti();
  } else {
    resetPosition(droppedElement);
  }
}

// Função para eventos de toque
function handleTouchStart(event) {
  event.preventDefault();
  var touch = event.touches[0];
  var imageId = event.target.id;

  event.target.style.position = "absolute";
  event.target.style.left = `${touch.clientX - event.target.offsetWidth / 2}px`;
  event.target.style.top = `${touch.clientY - event.target.offsetHeight / 2}px`;

  event.target.dataset.touching = true;
}

function handleTouchMove(event) {
  if (event.target.dataset.touching) {
    var touch = event.touches[0];
    event.target.style.left = `${touch.clientX - event.target.offsetWidth / 2}px`;
    event.target.style.top = `${touch.clientY - event.target.offsetHeight / 2}px`;
  }
}

function handleTouchEnd(event) {
  event.target.dataset.touching = false;

  var dropAreas = document.querySelectorAll('.drop-area');
  var imageId = event.target.id;

  dropAreas.forEach(function(dropArea) {
    var rect = dropArea.getBoundingClientRect();
    var touchX = event.changedTouches[0].clientX;
    var touchY = event.changedTouches[0].clientY;

    if (touchX >= rect.left && touchX <= rect.right && touchY >= rect.top && touchY <= rect.bottom) {
      if (checkAnswer(imageId, dropArea.id)) {
        var textContent = dropArea.innerHTML;
        dropArea.innerHTML = "";

        var textElement = document.createElement("p");
        textElement.innerHTML = textContent;
        dropArea.appendChild(textElement);

        dropArea.appendChild(event.target);
        throwConfetti();
      } else {
        resetPosition(event.target);
      }
    }
  });
}

// Função para validar a resposta correta (continua igual)
function checkAnswer(imageId, dropAreaId) {
  return (imageId === "img1" && dropAreaId === "drop1") ||
         (imageId === "img2" && dropAreaId === "drop2") ||
         (imageId === "img3" && dropAreaId === "drop3") ||
         (imageId === "img4" && dropAreaId === "drop4") ||
         (imageId === "img5" && dropAreaId === "drop5") ||
         (imageId === "img6" && dropAreaId === "drop6") ||
         (imageId === "img7" && dropAreaId === "drop7") ||
         (imageId === "img8" && dropAreaId === "drop8") ||
         (imageId === "img9" && dropAreaId === "drop9") ||
         (imageId === "img10" && dropAreaId === "drop10") ||
         (imageId === "img11" && dropAreaId === "drop11") ||
         (imageId === "img12" && dropAreaId === "drop12");
}

// Função para jogar confetes (continua igual)
function throwConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
}

// Função para reposicionar a imagem no local original (continua igual)
function resetPosition(element) {
  var dragContainer = document.getElementById('drag-container');
  dragContainer.appendChild(element);
}

// Adicionar eventos de toque aos elementos
document.querySelectorAll('img').forEach(function(img) {
  img.addEventListener('touchstart', handleTouchStart);
  img.addEventListener('touchmove', handleTouchMove);
  img.addEventListener('touchend', handleTouchEnd);
});
