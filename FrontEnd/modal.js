let modal = null;

const openModal = function (e) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute('href'))
    target.style.display = null
    target.removeAttribute('aria-hidden')
    target.setAttribute('aria-modal', true)
    modal = target
    modal.addEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
}

const closeModal = function (e) {
    if (modal === null) return
    e.preventDefault()
    modal.style.display = "none"
    modal.setAttribute('aria-hidden', true   )
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
    modal = null
}

const stopPropagation = function (e) {
    e.stopPropagation()
}

const sectionModal = document.querySelector('.modal-content');

document.querySelectorAll('.js-modal').forEach(a =>{
    a.addEventListener('click', openModal)
})

window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.key === 'Esc'){
        closeModal(e)
    }
})


fetch('http://localhost:5678/api/works')
 .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
 .then(works => {
    genererWorks(works);
  })
 .catch(error => {
    console.error('Error fetching or parsing the data:', error);
  });

  const addPhotoModal = document.querySelector('.add-photo-modal');


  // Create the "Back" button
  const backButton = document.createElement('button');
  const arrow = document.createElement('i');
  backButton.classList.add('back-btn');
  arrow.classList.add('fa-solid','fa-arrow-left');
  backButton.appendChild(arrow);
  addPhotoModal.appendChild(backButton);


  function genererWorks(works) {
    sectionModal.innerHTML = '';
  
    
  // Create the "ajouter une photo" button
  const addPhotoButton = document.createElement('button');
  addPhotoButton.textContent = 'Ajouter une photo';
  addPhotoButton.classList.add('add-photo-btn');
  sectionModal.appendChild(addPhotoButton);

  // Add event listener to the "Ajouter une photo" button
  addPhotoButton.addEventListener('click', () => {
    sectionModal.style.display = 'none';
    addPhotoModal.style.display = 'block';

  });
    // Add event listener to the "Back" button
    backButton.addEventListener('click', () => {
      sectionModal.style.display = 'grid';
      addPhotoModal.style.display = 'none';
    });

  
    for (let i = 0; i < works.length; i++) {
      const article = works[i];
      const worksElement = document.createElement('article');
      const imageElement = document.createElement('img');
      imageElement.src = article.imageUrl;
      const trash = document.createElement('div');
      trash.classList.add('trash');
      const iconTrash = document.createElement('i');
      iconTrash.classList.add('fa-solid', 'fa-trash-can');
      trash.appendChild(iconTrash);
      worksElement.appendChild(trash);
      worksElement.appendChild(imageElement);
      sectionModal.appendChild(worksElement);
      console.log(article.id);
      console.log(localStorage.getItem('token'));
      trash.addEventListener('click', () => {
        fetch(`http://localhost:5678/api/works/${article.id}`, {
          method: "DELETE",
						headers: {
							"Content-type": "application/json",
							Authorization: "Bearer " + localStorage.getItem("token"),
						},
        })
        .then((reponse) => reponse.json)

       .then(data => {
        console.log(data);
        sectionModal.removeChild(worksElement);
        document.getElementById('projet'+article.id).remove();
        })
       .catch(error => {
          console.error('Error fetching or parsing the data:', error);
        });
      });

    }
  }




  fetch('http://localhost:5678/api/categories')
  .then(response => response.json())
  .then(categories => {
    const categorySelect = document.getElementById('category-select');
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category.id;
      option.text = category.name;
      categorySelect.add(option);
    });
  })
  .catch(error => console.error('Erreur lors de la récupération des catégories :', error));


const validateBtn = document.getElementById('validate-btn');
const addPhotoForm = document.getElementById('add-photo-form');

// .......................
const textAddPhoto = document.querySelector('.text-format-photo');
const addPhotoContainer = document.querySelector('.add-photo-container');
const photoView = document.querySelector('.photo-view');
const photoInput = document.getElementById('photo-input');
photoView.style.display = 'none';

photoInput.addEventListener('change', () => {
  console.log('sssss');
  const imageURL = URL.createObjectURL(photoInput.files[0]);
 const imageModal = document.createElement('img');
 photoView.appendChild(imageModal);
 imageModal.src = imageURL;

 addPhotoContainer.style.display = 'none';
  photoView.style.display = 'flex';
  textAddPhoto.style.display = 'none';

})


validateBtn.addEventListener('click', (event) => {
  event.preventDefault(); // Empêcher le rechargement de la page

  // Récupérer les valeurs du formulaire
  const title = document.getElementById('title-field').value;
  const categoryId = document.getElementById('category-select').value;
  const photoInput = document.getElementById('photo-input');
  const imagePreview = document.getElementById('image-preview');

  // Effectuer les validations nécessaires
  if (!title || !categoryId || !photoInput) {
    alert('Veuillez remplir tous les champs');
    return;
  }

  // Créer un objet FormData pour envoyer les données du formulaire
  const formData = new FormData();
  formData.append('title', title);
  formData.append('category', categoryId);
  formData.append('image', photoInput.files[0]);
  console.log(photoInput.files[0]);

  // Envoyer les données du formulaire au serveur
  fetch('http://localhost:5678/api/works', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer '+ localStorage.getItem('token')
    },
    body: formData,
    
  })

  .then((response) => response.json())
    .then(data => {
        console.log(data);
        alert('Photo ajoutée avec succès');
        // Réinitialiser le formulaire
        addPhotoForm.reset(); 
        const worksElement = document.createElement('article');
        const imageElement = document.createElement('img');
        imageElement.src = data.imageUrl;
        const trash = document.createElement('div');
        trash.classList.add('trash');
        const iconTrash = document.createElement('i');
        iconTrash.classList.add('fa-solid', 'fa-trash-can');
        trash.appendChild(iconTrash);
        worksElement.appendChild(trash);
        worksElement.appendChild(imageElement);
        sectionModal.appendChild(worksElement);

        trash.addEventListener('click', () => {
          fetch(`http://localhost:5678/api/works/${article.id}`, {
          method: "DELETE",
						headers: {
							"Content-type": "application/json",
							Authorization: "Bearer " + localStorage.getItem("token"),
						},
        })
        .then((reponse) => reponse.json)

       .then(data => {
        console.log(data);
        sectionModal.removeChild(worksElement);
        document.getElementById('projet'+article.id).remove();
        })
       .catch(error => {
          console.error('Error fetching or parsing the data:', error);
        });
        });

          // Ajouter la nouvelle image à la galerie
    const sectionGallery = document.querySelector('.gallery');
    const article = document.createElement('article');
    const figureElement = document.createElement('figure');
    figureElement.setAttribute('id', 'projet' + data.id);
    const figcaptionElement = document.createElement('figcaption');

    figureElement.appendChild(imageElement.cloneNode(true));
    figcaptionElement.innerText = data.title;
    figureElement.appendChild(figcaptionElement);
    article.appendChild(figureElement);
    sectionGallery.appendChild(article);
    })
    .catch(error => {
      console.error('Erreur lors de l\'ajout de la photo :', error);
      alert('Une erreur est survenue lors de l\'ajout de la photo');
    });
});
