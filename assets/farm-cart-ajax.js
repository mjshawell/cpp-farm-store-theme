document.addEventListener('DOMContentLoaded', function () {
  const cartForms = document.querySelectorAll('form[action*="/cart/add"]');

  if (!cartForms.length) return;

  cartForms.forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const submitButton = form.querySelector('button[type="submit"]');
      const originalButtonText = submitButton ? submitButton.textContent : '';

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Adding...';
      }

      const formData = new FormData(form);

      fetch('/cart/add.js', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
        .then(function (response) {
          if (!response.ok) {
            throw new Error('Item could not be added.');
          }

          return response.json();
        })
        .then(function () {
          showFarmCartToast();
          updateFarmCartCount();

          if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
          }
        })
        .catch(function () {
          showFarmCartToast('Sorry, this item could not be added. Please try again.');

          if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
          }
        });
    });
  });

  function showFarmCartToast(message) {
    let toast = document.querySelector('.farm-cart-toast');

    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'farm-cart-toast';

      toast.innerHTML = `
        <div class="farm-cart-toast__icon">🌱</div>
        <div class="farm-cart-toast__content">
          <h3>Added to cart</h3>
          <p>Your Farm Store item has been added successfully.</p>
          <div class="farm-cart-toast__actions">
            <a href="/cart">View Cart</a>
            <button type="button">Keep Shopping</button>
          </div>
        </div>
      `;

      document.body.appendChild(toast);

      const closeButton = toast.querySelector('button');

      closeButton.addEventListener('click', function () {
        toast.classList.remove('is-visible');
      });
    }

    if (message) {
      const toastHeading = toast.querySelector('h3');
      const toastText = toast.querySelector('p');

      toastHeading.textContent = 'Cart update';
      toastText.textContent = message;
    } else {
      const toastHeading = toast.querySelector('h3');
      const toastText = toast.querySelector('p');

      toastHeading.textContent = 'Added to cart';
      toastText.textContent = 'Your Farm Store item has been added successfully.';
    }

    toast.classList.add('is-visible');

    setTimeout(function () {
      toast.classList.remove('is-visible');
    }, 4500);
  }

  function updateFarmCartCount() {
    fetch('/cart.js')
      .then(function (response) {
        return response.json();
      })
      .then(function (cart) {
        const possibleCartCountSelectors = [
          '.cart-count',
          '.cart-count-bubble',
          '[data-cart-count]',
          '.header__cart-count'
        ];

        possibleCartCountSelectors.forEach(function (selector) {
          const cartCountElements = document.querySelectorAll(selector);

          cartCountElements.forEach(function (element) {
            element.textContent = cart.item_count;
          });
        });
      });
  }
});