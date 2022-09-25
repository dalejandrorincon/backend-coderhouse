const logoutButton = document.querySelector('#logout');
  logoutButton.addEventListener('click', () => {
    fetch('/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => {
      window.location.href = '/';
    });
  });