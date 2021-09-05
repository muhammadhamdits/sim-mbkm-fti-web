const checkAuth = async (data) => {
  const uri = `${process.env.VUE_APP_API_URI}`

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

function delCookie(cname, cvalue='', exdays=1) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function toggleFormElements(document, status) { 
  document.querySelectorAll('form > *').forEach(function(a){
    if(a.tagName !== 'BUTTON') a.disabled=status
  })
}

module.exports = { checkAuth, getCookie, delCookie, toggleFormElements }