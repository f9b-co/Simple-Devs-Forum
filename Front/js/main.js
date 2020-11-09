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
    cache: "default",}
];


document.onload = orderAndServe(setUrlEndpoint("/topics", "?p=0&s=100"), fetchesParams[0], list);
docIdCreateTopicForm.addEventListener("submit", (e) => {    
    e.preventDefault(); // Cancel submit default behavior
    submitBehavior(docIdCreateTopicForm);    
  },
  false
);

//await linked html page loading end to avoid some annoying interractions between the 2 pages scripts execution
/* if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', onLoad());
} else {
  onLoad();
}

function onLoad() {
    orderAndServe(setUrlEndpoint("/topics", "?p=0&s=100"), fetchesParams[0], list);
    docIdCreateTopicForm.addEventListener("submit", (e) => {    
        e.preventDefault(); // Cancel submit default behavior
        submitBehavior(docIdCreateTopicForm);    
      },
      false
    );
} */

// Create form submit behavior defining fetch specific params including jsonString converted data
export function submitBehavior(form) {
  const submitTimestamp = Date.now();
  const urlSlug = "/topics/";
  const newId = submitTimestamp+"_"+form.querySelector("#nickname").value;

  const data = new FormData(form);
  data.set("submitDate", submitTimestamp);
  data.set("postId", newId);
  if (form.getAttribute("name").includes("reply")) {
    data.append("topicPostId", sessionStorage.getItem("topicPostId"));
  }
  console.log(data);
  const jsonData = JSON.stringify(Object.fromEntries(data));
  console.log(jsonData);
  
  const url = setUrlEndpoint(urlSlug, "");

  const fetchParams = (form.getAttribute("method") == "post")? fetchesParams[1]: fetchesParams[2];
  fetchParams.body = jsonData;
  
  const callback = (form.getAttribute("data-slug").includes("topic"))? newTopicSuccess: tJs.newReplySuccess;

  orderAndServe(url, fetchParams, callback);
}

// fetch call with specific params, errors simple management and callback regarding request type
export function orderAndServe(url, params, callback) {  

    fetch(url, params)
      .then(response => /* {        
        if (["POST", "PUT", "PATCH"].includes(params.method)){
          response.text();
        } else {
          response.json();
        }
      }) */
      response.json())
      .then(result => {
        console.log(params.body);
        console.log(result);
        if (["POST", "PUT", "PATCH"].includes(params.method)){
          callback(params.body)
        } else {
          callback(result);
        }
      })
      .catch((error) => {
        console.log("Fichtre! Une erreur nous casse les fetchs : \n" + error.message)
    });  
  
}

function newTopicSuccess(jsonTopic) {
  window.location.pathname = "/topic.html";
  sessionStorage.setItem('topicData', jsonTopic);
  sessionStorage.setItem('topicPostId', JSON.parse(jsonTopic).postId);
}

function loadTopic (result) {
  window.location.pathname = "/topic.html";
  sessionStorage.setItem('topicData', JSON.stringify(result));
  sessionStorage.setItem('topicPostId', result.postId);
}

function list(topics) {
  const topicsContent = topics.content;
  topicsContent.forEach((topic) => {   
    const div = createNode("div");
    div.setAttribute("class","topicInfos");
      const dateDiv = createNode("div", "submitDate", "submitDate", formatDate(topic.submitDate));
      append(div, dateDiv);
      const nameDiv = createNode("div", "nickname", "nickname", topic.nickname);
      append(div, nameDiv);
      const subjectDiv = createNode("div", "subject", "subject", topic.subject);
      append(div, subjectDiv);
      makeTopicClickable(div,topic.postId)
    append(docIdTopicsList, div); 
  });
}

function makeTopicClickable(el,topicPostId) {
  el.addEventListener("click", function () {
    orderAndServe(setUrlEndpoint("/topics/", topicPostId), fetchesParams[0], loadTopic);
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
  if ((array[i][0] != "postId") && (array[i][0] != "topicPostId") && (array[i][0] != "replyCode")) { // discard 3 fields to treat them another way
    let child = createNode(childTag);
    child.setAttribute("id", array[i][0])
    let inHtml = "";
    if (array[i][0] == "submitDate") { 
      inHtml = formatDate(Date(array[i][1])); // display Timestamp as wanted date & time format
    } else {
      inHtml = array[i][1]; // display "standard" fields
    }
    child = createNode(childTag, array[i][0], "", inHtml);
    append(parent, child);
  }
  if (array[i][0] == "replyCode") { // specific display for one of the 3 dicarded fields
      const p = createNode("p");
      p.setAttribute("id", array[i][0]);
      p.innerHTML = array[i][1];
      append(parent, p);
  }
}

export function append(parent, el) {
  return parent.appendChild(el);
}

export function createNode(elType, id="", classes="", innerhtml="") {
  const el = document.createElement(elType);
  el.setAttribute("id", id);
  el.setAttribute("class", classes);
  el.innerHTML = innerhtml;
  return el;
}

function formatDate(d) {
  let date = new Date(d)
  let dd = date.getDate(); 
  let mm = date.getMonth()+1;
  let yyyy = date.getFullYear();
  let HH = date.getHours();     
  let MM = date.getMinutes()
  if(dd<10){dd='0'+dd} 
  if(mm<10){mm='0'+mm};
  if(HH<10){HH='0'+HH};
  if(MM<10){MM='0'+MM};
  return d = dd+'/'+mm+'/'+yyyy+' '+HH+':'+MM
}
