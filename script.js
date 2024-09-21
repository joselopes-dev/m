let draggedElement = null;

    // Função para permitir o drop
    function allowDrop(event) {
      event.preventDefault();
    }

    // Função para iniciar o arraste no desktop
    function drag(event) {
      draggedElement = event.target;
      event.dataTransfer.setData("imageId", draggedElement.id);
    }

    // Função para soltar a imagem
    function drop(event) {
      event.preventDefault();
      const imageId = event.dataTransfer.getData("imageId");
      const droppedElement = document.getElementById(imageId);

      if (checkAnswer(imageId, event.target.id)) {
        const dropArea = event.target;

        // Mantém o texto separado da imagem
        const textContent = dropArea.innerHTML;
        dropArea.innerHTML = "";
        const textElement = document.createElement("p");
        textElement.innerHTML = textContent;
        dropArea.appendChild(textElement);
        dropArea.appendChild(droppedElement);

        throwConfetti();
      } else {
        resetPosition(droppedElement);
      }
    }

    // Função de toque para dispositivos móveis
    function handleTouchStart(event) {
      draggedElement = event.target;
    }

    function handleTouchMove(event) {
      event.preventDefault();
      const touch = event.touches[0];
      draggedElement.style.position = "absolute";
      draggedElement.style.left = `${touch.clientX - draggedElement.width / 2}px`;
      draggedElement.style.top = `${touch.clientY - draggedElement.height / 2}px`;
    }

    function handleTouchEnd(event) {
      const dropAreas = document.querySelectorAll(".drop-area");
      let droppedInArea = false;

      dropAreas.forEach(function(dropArea) {
        const rect = dropArea.getBoundingClientRect();
        const touch = event.changedTouches[0];

        if (touch.clientX >= rect.left && touch.clientX <= rect.right && touch.clientY >= rect.top && touch.clientY <= rect.bottom) {
          if (checkAnswer(draggedElement.id, dropArea.id)) {
            const textContent = dropArea.innerHTML;
            dropArea.innerHTML = "";
            const textElement = document.createElement("p");
            textElement.innerHTML = textContent;
            dropArea.appendChild(textElement);
            dropArea.appendChild(draggedElement);
            throwConfetti();
            droppedInArea = true;
          }
        }
      });

      if (!droppedInArea) {
        resetPosition(draggedElement);
      }

      draggedElement = null;
    }

    // Função para validar a resposta correta
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

    // Função para jogar confetes 🎉
    function throwConfetti() {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }

    // Função para reposicionar a imagem no local original
    function resetPosition(element) {
      const dragContainer = document.getElementById('drag-container');
      dragContainer.appendChild(element);
    }

    // Adiciona suporte para toque em dispositivos móveis
    document.querySelectorAll('img').forEach(function(img) {
      img.addEventListener('touchstart', handleTouchStart);
      img.addEventListener('touchmove', handleTouchMove);
      img.addEventListener('touchend', handleTouchEnd);
    });
