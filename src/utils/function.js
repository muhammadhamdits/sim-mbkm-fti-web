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

function addClass(el, className)
{
  if (el.classList) el.classList.add(className)
  else if (!hasClass(el, className)) el.className += " " + className;
}

function removeClass(el, className)
{
  if (el.classList) el.classList.remove(className)
  else if (hasClass(el, className))
  {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
    el.className = el.className.replace(reg, ' ');
  }
}

const getRandomRgb = () => {
  const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1))
  const r = randomBetween(0, 255)
  const g = randomBetween(0, 255)
  const b = randomBetween(0, 255)
  const rgb = `rgb(${r},${g},${b})`
  return rgb
}

module.exports = { checkAuth, getCookie, delCookie, toggleFormElements, addClass, removeClass, getRandomRgb }