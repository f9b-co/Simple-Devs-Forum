const xxx = document.querySelector("#xxx");
const urlPath = "http://xyz";
let urlSlug = "";
const urlQuery = "?";
let urlApi = urlPath + urlSlug + urlQuery;

selArea.addEventListener("change", () => {
  changeMapSrc(selArea.options[selArea.selectedIndex].text);
  urlSlug = selArea.value;
  urlApi = urlPath + urlSlug + urlQuery;
  tableBody.innerHTML = tableBody.oldHTML;
  loadCountries(urlApi);
  selArea.blur();
});

document.onload = loadTopics(urlApi);

function loadTopics(url) {
  fetch(url)
    .then((resp) => resp.json())
    .then((jsonResp) => list(jsonResp))
    .catch((error) => console.log("Erreur : " + error));
}

function list(topics) {
  console.log(topics);
  topics.forEach((topic) => {
    //
  });
}

function notNullCheck(el) {
  if (el != null) {
    return el;
  } else return "N/A";
}

function numFormat(x) {
  return new Intl.NumberFormat("en-GB", { maximumFractionDigits: 3 }).format(x);
}

function append(parent, el) {
  return parent.appendChild(el);
}

function createNode(el) {
  return document.createElement(el);
}
