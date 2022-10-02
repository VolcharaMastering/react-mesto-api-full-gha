///------For API request------
const BASE_URL = 'https://api.mesto.vmstr.nomoredomains.icu/'
let token = localStorage.getItem('jwt');
const URL_CONFIG = {
  'url': 'https://api.mesto.vmstr.nomoredomains.icu/',
  'headers': {
    "Accept": "application/json",
    'Authorization': `Bearer ${token}`,
    "Content-Type": "application/json",
  }
}

export { URL_CONFIG, BASE_URL };