fetch('http://localhost:5678/api/works')
 .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
 .then(works => {
    genererWorks(works);
    genererCat(works);
  })
 .catch(error => {
    console.error('Error fetching or parsing the data:', error);
  });


function genererWorks(works) {
  const sectionGallery = document.querySelector('.gallery');

  for (let i = 0; i < works.length; i++) {
    const article = works[i];
    const worksElement = document.createElement('article');
    const imageElement = document.createElement('img');
    imageElement.src = article.imageUrl;
    const nomElement = document.createElement('h2');
    nomElement.innerText = article.title;

    const figureElement = document.createElement('figure');
    worksElement.setAttribute('id','projet'+ works[i].id)
    const figcaptionElement = document.createElement('figcaption');

    figureElement.appendChild(imageElement);
    figcaptionElement.innerText = article.title;
    figureElement.appendChild(figcaptionElement);
    worksElement.appendChild(figureElement);
    sectionGallery.appendChild(worksElement);
  }
}

function genererCat(works) {
  fetch('http://localhost:5678/api/categories')
 .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
 .then(categories => {
    const categoriesList = document.getElementById('buttons');
    const btnAll = document.createElement ('button');
    btnAll.setAttribute ('id','Tous');
    btnAll.textContent = ('Tous');
    categoriesList.appendChild(btnAll);
    categories.forEach(category => {
      const categoryButton = document.createElement('button');
      categoryButton.textContent = category.name;
    categoryButton.setAttribute ('id',category.name)
      categoriesList.appendChild(categoryButton);
    });
    //filtresObjest
    const btnObjets = document.getElementById('Objets')
    btnObjets.addEventListener ('click', function () {
      console.log ('test')
      const filtreObjets = works.filter(function(work){
        return work.categoryId === 1;
      })
      document.querySelector('.gallery').textContent = ''
      genererWorks(filtreObjets)
    })
// filtres Appartements
const btnAppart = document.getElementById('Appartements')
btnAppart.addEventListener ('click', function () {
  console.log ('test')
  const filtreAppart = works.filter(function(work){
    return work.categoryId === 2;
  })
  document.querySelector('.gallery').textContent = ''
  genererWorks(filtreAppart)
})
// filtres Hotels & restaurants
const btnHotRest = document.getElementById('Hotels & restaurants')
btnHotRest.addEventListener ('click', function () {
  console.log ('test')
  const filtreHotRest = works.filter(function(work){
    return work.categoryId === 3;
  })
  document.querySelector('.gallery').textContent = ''
  genererWorks(filtreHotRest)
})
// filtres tous
const btnTous = document.getElementById('Tous')
btnTous.addEventListener ('click', function () {
  console.log ('test')
  const filtreTous = works.filter(function(work){
    return work.categoryId === 1,2,3;
  })
  document.querySelector('.gallery').textContent = ''
  genererWorks(filtreTous)
})
  })
 .catch(error => {
    console.error('Error fetching or parsing the data:', error);
  });
}


function isLoggedIn() {
  const token = localStorage.getItem('token');
  if (!token) {
    console.log('User is not logged in');
    return false;
  }
  console.log('User is logged in');
  return true;
}

if (isLoggedIn()) {
  const logOut = document.getElementById('logout').addEventListener('click', function(){
    localStorage.removeItem('token');
    window.location.href = 'login_page.html';
    })
    document.querySelector('.edit-mode-bar').style.display = 'block'; // Show the element d
    document.getElementById('logIn').style.display = 'none';
    document.querySelector('.modifier').style.display = 'flex'; // Show the element d
    document.getElementById('buttons').style.display = 'none';
} else {
  document.querySelector('.edit-mode-bar').style.display = 'none'; 
  document.querySelector('.modifier').style.display = 'none';// Hide the element
  document.getElementById('logout').style.display = 'none';
  ;
}

