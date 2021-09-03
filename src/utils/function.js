const checkAuth = async (data) => {
  const uri = 'http://192.168.100.38:5000/'

  const res = await fetch(uri, { 
    method: 'POST', 
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const jsonData = await res.json()

  return jsonData
}

const getCookie = (cname) => {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

module.exports = { checkAuth, getCookie }