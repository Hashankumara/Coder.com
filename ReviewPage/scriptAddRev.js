document.addEventListener('DOMContentLoaded', function () {
  const cardsContainer = document.querySelector('.crsl');

  function generateStarRating(rating) {
    let starsHTML = '';
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        starsHTML += '<j class="fas fa-star"></j>'; // Full star
      } else {
        starsHTML += '<j class="far fa-star"></j>'; // Empty star
      }
    }
    return starsHTML;
  }

  // Handle form submission
  const form = document.getElementById('reviewForm');
  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission behavior

    
    const firstNameInput = document.getElementById('firstNameInput').value;
    const positionInput = document.getElementById('positionInput').value;
    const ratingInput = parseInt(document.getElementById('ratingInput').value);
    const reviewTextInput = document.getElementById('reviewTextInput').value;

    // Create card element
    const card = document.createElement('li');
    card.classList.add('card');
    card.innerHTML = `
      <div class="img"><img src="images/img-10.jpg" alt="img"></div>
      <h4>${firstNameInput}</h4>
      <span>${positionInput}</span>
      <div class="rating">
        ${generateStarRating(ratingInput)}
      </div>
      <p>${reviewTextInput}</p>
    `;

    // Append the new review card to the container
    cardsContainer.appendChild(card);

    // Clear form inputs
    form.reset();
  });
});
