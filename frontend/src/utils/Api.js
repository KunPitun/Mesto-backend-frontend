export const BASE_URL = 'https://api.kunpitun.mesto.nomoredomains.icu';

export const getUserData = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${localStorage.getItem('jwt')}`,
    }
  })
    .then(checkResponse);
}

export const getInitialCards = () => {
  return fetch(`${BASE_URL}/cards`, {
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${localStorage.getItem('jwt')}`,
    }
  })
    .then(checkResponse);
}

export const giveUserInfo = (name, info) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify({
      name: name,
      about: info
    })
  })
    .then(checkResponse);
}

export const giveCardInfo = (place, link) => {
  return fetch(`${BASE_URL}/cards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify({
      name: place,
      link: link
    })
  })
    .then(checkResponse);
}

export const changeLikeStatus = (cardId, isLiked) => {
  if (isLiked) {
    return fetch(`${BASE_URL}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem('jwt')}`,
      }
    })
      .then(checkResponse);
  }
  else {
    return fetch(`${BASE_URL}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem('jwt')}`,
      }
    })
      .then(checkResponse);
  }
}

export const deleteCard = (cardId) => {
  return fetch(`${BASE_URL}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${localStorage.getItem('jwt')}`,
    }
  })
    .then(checkResponse);
}

export const giveAvatarInfo = (link) => {
  return fetch(`${BASE_URL}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify({
      avatar: link
    })
  })
    .then(checkResponse);
}

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}