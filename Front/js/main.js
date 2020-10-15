import * as tJs from "./topic.js";
const docIdTopicsList = document.querySelector("#topicsList");
const docIdCreateTopicForm = document.querySelector("#createTopicForm");
export const fetchesParams = [
  { method: "GET",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    mode: "cors",
    cache: "default"},
  { method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: null,
    mode: "cors",
    cache: "default"},
  { method: "PATCH",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: null,
    mode: "cors",
    cache: "default"}
];

window.addEventListener("DOMContentLoaded", (event) => {
  docIdCreateTopicForm.addEventListener(
    "submit", (e) => {
      e.preventDefault(); // Cancel submit default behavior
      submitBehavior(docIdCreateTopicForm);    
    },
    false
  );
});
/* document.onload = orderAndServe(setUrlEndpoint("/topics", "?size=10"), fetchesParams[0], list); */

// Create form submit behavior defining api.fetches specific params
export function submitBehavior(form) {
  const submitTimestamp = Date.now();
  const urlSlug = "/topics/";
  const newId = submitTimestamp+"_"+form.querySelector("input:first-of-type").value;

  const data = new FormData(form);
  data.append("postId", newId);
  data.append("submitDateTime", submitTimestamp);
  const jsonData = JSON.stringify(Object.fromEntries(data));
  console.log(jsonData);
  
  const url = setUrlEndpoint(urlSlug, "");

  const fetchParams = (form.getAttribute("method") == "post")? 
    fetchesParams[1].body = jsonData:
    fetchesParams[2].body = jsonData;
  console.log(fetchParams);
  
  console.log((form.getAttribute("data-slug").includes("topic")));
  const callback = (form.getAttribute("data-slug").includes("topic"))?
    newTopicSuccess:
    tJs.newReplySuccess;

  /* orderAndServe(url, fetchParams, callback); */
  callback(jsonData); // for test purpose until backend release
}

export function orderAndServe(url, params, callback) {
  fetch(url, params)
    .then((resp) => {
      if (response.status !== 200) {
        alert(
          "La réponse du serveur ne nous comble point... : \n" + response.status
        );
        return;
      }
      (["POST", "PUT", "PATCH"].includes(params.method))? callback(params.body): callback(resp);
    })
    .catch((error) =>
      alert("Fichtre! Une erreur nous casse les fetchs : \n" + error)
    );
}

function newTopicSuccess(jsonTopic) {
  window.location.href = "/topic.html";
  sessionStorage.setItem('newTopicData', jsonTopic);
  sessionStorage.setItem('currentNewTopic', JSON.parse(jsonTopic).postId)
}

export function list(topics) {
  console.log(topics);
  topics.forEach((topic) => {
    //
  });
}

export function makeTopicClickable() {
  document.getElementById("#").addEventListener("click", function () {
    //;
  });
}

export function setUrlEndpoint(slug, params) {
  const urlPath = "http://localhost:8089";
  const urlEndpoint = urlPath + slug + params;
  console.log(urlEndpoint);
  return urlEndpoint;
}

export function notNullCheck(el) {
  if (el != null) {
    return true;
  } else return false;
}

export function createChildWithIdAndValueFromArray(parent, childTag, array, i) {
  if (array[i][0] != "postId") {
    const child = createNode(childTag);
    child.setAttribute("id", array[i][0])
    if (array[i][0] == "submitDateTime") {
      child.innerHTML = formatDate(Date(array[i][1]));
    }  else {
      child.innerHTML = array[i][1];
    }
    append(parent, child);
  }
}

export function append(parent, el) {
  return parent.appendChild(el);
}

export function createNode(el) {
  return document.createElement(el);
}

function formatDate(d) {
  const date = new Date(d)
  const dd = date.getDate(); 
  const mm = date.getMonth()+1;
  const yyyy = date.getFullYear();
  const HH = date.getHours();     
  const MM = date.getMinutes()
  if(dd<10){dd='0'+dd} 
  if(mm<10){mm='0'+mm};
  return d = dd+'/'+mm+'/'+yyyy+' '+HH+':'+MM
}
