const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');
// selected image
let sliders = [];


// Find the name in the url and go to their website
// to create your own api key
const key = '15674931-a9d714b6e9d654524df198e00&q';

// show images
const showImages = (images) => {
  imagesArea.style.display = 'block';
   gallery.innerHTML = '';
  // show gallery title
  if (images.length === 0) {
    let errorDiv = document.createElement('div');
    errorDiv.innerHTML = `<h1 class="d-block error-massage mt-5">!! SORRY 😞😞 There is no picture in this name from our Webside !!</h1>`;
    gallery.appendChild(errorDiv);
  } else {
    galleryHeader.style.display = 'flex';
    images.forEach((image) => {
      let div = document.createElement('div');
     
      div.className = 'col-lg-3 col-md-4 col-xs-6  img-item mb-2';
      div.innerHTML = ` <img  class="img-fluid soo img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`;
      gallery.appendChild(div);
     togleSpinner(false)
     
    });
  }
};

const getImages = (query) => {
  
   const url = `https://pixabay.com/api/?key=${key}=${query}&image_type=photo&pretty=true`
   togleSpinner(true)
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      showImages(data.hits);
    })
    .catch(err => console.log(err))
};

let slideIndex = 0;
const selectItem = (event, img) => {
  let element = event.target;
  element.classList.add('added');

  let item = sliders.indexOf(img);
  if (item === -1) {
    sliders.push(img);
  } else {
    alert('Hey, Already added !');
  }
};
var timer;
const createSlider = () => {
  // check slider image length
  if (sliders.length < 2) {
    alert('Select at least 2 image.');
    return;
  }
  // crate slider previous next area
  sliderContainer.innerHTML = '';
  const prevNext = document.createElement('div');
  prevNext.className = 'prev-next d-flex w-100 justify-content-between align-items-center';
  prevNext.innerHTML = ` 
  <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
  `;

  sliderContainer.appendChild(prevNext);
  document.querySelector('.main').style.display = 'block';
  // hide image aria
  imagesArea.style.display = 'none';
  const duration = document.getElementById('doration').value || 1000;
  //  negative value time canot be set
  if (duration < 0) {
    alert('Timeing canot be negative ⏰⏰...!! please enter your posative value !!');
    
  } else {
    sliders.forEach((slide) => {
      let item = document.createElement('div');
      item.className = 'slider-item';
      item.innerHTML = `<img class="w-100"
      src="${slide}"
      alt="" >`;
      sliderContainer.appendChild(item);
    });

    changeSlide(0);
    timer = setInterval(function () {
      slideIndex++;

      changeSlide(slideIndex);
    }, duration);
  }
};

// change slider index
const changeItem = (index) => {
  changeSlide((slideIndex += index));
};

// change slide item
const changeSlide = (index) => {
  const items = document.querySelectorAll('.slider-item');
  if (index < 0) {
    slideIndex = items.length - 1;
    index = slideIndex;
  }

  if (index >= items.length) {
    index = 0;
    slideIndex = 0;
  }

  items.forEach((item) => {
    item.style.display = 'none';
  });

  items[index].style.display = 'block';
};

searchBtn.addEventListener('click', function () {
  document.querySelector('.main').style.display = 'none';
  clearInterval(timer);
  const search = document.getElementById('search');
  getImages(search.value);
  sliders.length = 0;
});

sliderBtn.addEventListener('click', function () {
  createSlider();
});


// enter search btn
document.getElementById('search').addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    document.getElementById('search-btn').click();
  }
});

// enter slider btn

document.getElementById('doration').addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    document.getElementById('create-slider').click();
  }
});

const togleSpinner = (show) => {
  const spinner = document.getElementById('spinner-added');
  if(show){
    spinner.classList.remove("d-none")
  }
  else{
    spinner.classList.add("d-none")
  }
  
};

// ** Extra fiture add:
// No 1- If i do something at search input write if it is not in my data then show something
// NO 2 - (slider change duration input) add in Enter key





