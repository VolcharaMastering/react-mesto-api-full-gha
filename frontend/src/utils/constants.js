///------For API request------
const BASE_URL = 'https://api.vmstr-proj.ru/'
let token = localStorage.getItem('jwt');
const URL_CONFIG = {
  'url': 'https://api.vmstr-proj.ru/',
  'headers': {
    "Accept": "application/json",
    'Authorization': `Bearer ${token}`,
    "Content-Type": "application/json",
  }
}

export { URL_CONFIG, BASE_URL };