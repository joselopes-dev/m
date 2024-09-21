let draggedElement = null;
let offsetX = 0;
let offsetY = 0;

// Função para permitir que os elementos possam ser soltos
function allowDrop(event) {
  event.preventDefault();
}

// Função para começar a arrastar o item
function startDrag(event) {
  draggedElement = event.target;
  offsetX = event.clientX - draggedElement.getBoundingClientRect().left;
  offsetY = event.clientY - draggedElement.getBoundingClientRect().top;

  draggedElement.style.position = "absolute";
  draggedElement.style.zIndex = 1000;
}

// Função para mover o item enquanto ele está sendo arrastado
function moveDrag(event) {
  if (!draggedElement) return;

  event.preventDefault();
  draggedElement.style.left = `${event.clientX - offsetX}px`;
  draggedElement.style.top = `${event.clientY - offsetY}px`;
}

// Função para finalizar o arraste e soltar o item
function stopDrag(event) {
  if (!draggedElement) return;

  // Verifica se foi solto sobre uma área válida
  const dropAreas = document.querySelectorAll('.drop-area');
  let droppedInArea = false;

  dropAreas.forEach(function(dropArea) {
    const rect = dropArea.getBoundingClientRect();

    if (
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom
    ) {
      if (checkAnswer(draggedElement.id, dropArea.id)) {
        var textContent = dropArea.innerHTML;
        dropArea.innerHTML = "";

        var textElement = document.createElement("p");
        textElement.innerHTML = textContent;
        dropArea.appendChild(textElement);

        dropArea.appendChild(draggedElement); 
        throwConfetti();
        droppedInArea = true;
      }
    }
  });

  if (!droppedInArea) {
    resetPosition(draggedElement); // Retorna ao lugar original se não for solto em uma área correta
  }

  draggedElement = null; // Limpa a referência ao item arrastado
}

// Função para verificar a resposta correta (mesma lógica)
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

// Função para jogar confetes
function throwConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
}

// Função para reposicionar a imagem no local original
function resetPosition(element) {
  var dragContainer = document.getElementById('drag-container');
  dragContainer.appendChild(element);
  element.style.position = "";
  element.style.left = "";
  element.style.top = "";
  element.style.zIndex = "";
}

// Adiciona eventos de ponteiro aos elementos arrastáveis
document.querySelectorAll('img').forEach(function(img) {
  img.addEventListener('pointerdown', startDrag);
  img.addEventListener('pointermove', moveDrag);
  img.addEventListener('pointerup', stopDrag);
  img.addEventListener('pointercancel', stopDrag); // Para garantir o fim do arraste no cancelamento
});

// Previne o comportamento padrão de arrastar imagens nativamente
document.querySelectorAll('img').forEach(function(img) {
  img.ondragstart = function() { return false; };
});
