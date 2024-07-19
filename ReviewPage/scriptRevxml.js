document.addEventListener('DOMContentLoaded', function () {
    const cardsContainer = document.querySelector('.crsl');
  
    // Function to fetch and parse XML file
    function fetchAndParseXML(xmlFile) {
      fetch(xmlFile)
        .then(response => response.text())
        .then(xmlText => {
          // Parse XML
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
  
          // Extract review data
          const reviews = xmlDoc.querySelectorAll('review');
  
          // Display reviews on the webpage
          reviews.forEach(review => {
            const image=review.querySelector('image').textContent;
            const firstName = review.querySelector('firstName').textContent;
            const position = review.querySelector('position').textContent;
            const reviewText = review.querySelector('reviewText').textContent;
            const rating = parseInt(review.querySelector('rating').textContent);

            // Create card element
            const card = document.createElement('li');
            card.classList.add('card');
            card.innerHTML = `
              <div class="img"><img src="images/${image}.jpg" alt="img"></div>
              <h4>${firstName}</h4>
              <span>${position}</span>
              <div class="rating">
              ${generateStarRating(rating)}
            </div>
            <p>${reviewText}</p>
            `;
            cardsContainer.appendChild(card);
          });
        })
        .catch(error => {
          console.error('Error fetching or parsing XML:', error);
        });
    }
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
  
    // Array of XML file URLs
    const xmlFiles = ['reviews1.xml', 'reviews2.xml', 'reviews3.xml']; // Add more XML file URLs as needed
  
    // Fetch and parse each XML file
    xmlFiles.forEach(xmlFile => {
      fetchAndParseXML(xmlFile);
    });
  });
  