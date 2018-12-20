let result = document.getElementById('result');


let numberInput = document.querySelector('#numberInput');
    numberInput.addEventListener('input', getData);

function getData () {
  let number = numberInput.value;

  if(number != '' && number.toString().length === 13) {

    fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${number}&jscmd=data&format=json`)
    .then(response => {
      return response.json()
    })
    .then(data => {

      let bookData = data['ISBN:9780980200447'];
      let authorName = bookData.authors[0].name;
      let cover = bookData.cover.small;
      let title =  bookData.title;
      let numOfPages = bookData.number_of_pages;
      let date = bookData.publish_date;
      let url = bookData.url

    
      result.style.display = 'block';
      let text = `
      <img class="card-img-top img-style" src="${cover}" alt="Card image cap">
      <div class="card-body">
      <h4 class="card-title">${title}</h4>
      <div class="card-text">
        <h5>Author: ${authorName}</h5>        
        <h5>Publish date: ${date}</h5>
        <h5>Number of pages: ${numOfPages}</h5>
        <a href="${url}" class="btn btn-primary">Link To Book</a>
        </div>
      </div>
      `;
      result.innerHTML = text;
      numberInput.value = '';
    })
    .catch(err => {
      console.log(err);
      numberInput.value = '';
    });
  }

  
}