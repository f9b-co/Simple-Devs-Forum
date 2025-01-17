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

document.onload = orderAndServe(setUrlEndpoint("/topics", "?p=0&s=10"), fetchesParams[0], list);

//await DOM loading end to avoid some annoying interractions between the 2 pages scripts execution
window.addEventListener("DOMContentLoaded", (event) => {
  docIdCreateTopicForm.addEventListener("submit", (e) => {    
      e.preventDefault(); // Cancel submit default behavior
      submitBehavior(docIdCreateTopicForm);    
    },
    false
  );
});

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
      .then(response => response.json())
      .then(result => {
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
  window.location.href = "/topic.html";
  sessionStorage.setItem('newTopicData', jsonTopic);
  sessionStorage.setItem('topicPostId', JSON.parse(jsonTopic).postId);
}

function list(topics) {
  const topicsContent = topics.content;
  console.log(topicsContent);
  topicsContent.forEach((topic) => {   
    const div = createNode("div");
      const span = createNode("span");
      span.setAttribute("id", "nickname");
      span.innerHTML = topic.nickname;
      append(div, span);
      const span2 = createNode("span2");
      span2.setAttribute("id", "submitDate");
      span2.innerHTML = topic.submitDate;
      append(div, span2);
      const span3 = createNode("span3");
      span3.setAttribute("id", "sujbect");
      span3.innerHTML = topic.subject;
      append(div, span3);
    append(docIdTopicsList, div); 
  });
}

function makeTopicClickable() {
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
     
  console.log(array);  
  if ((array[i][0] != "postId")&& (array[i][0] != "TopicPostId") && (array[i][0] != "replyCode")) { // discard 2 fields to treat them another way
    const child = createNode(childTag);
    child.setAttribute("id", array[i][0])
    if (array[i][0] == "submitDate") { 
      child.innerHTML = formatDate(Date(array[i][1])); // display Timestamp as wanted date & time format
    } else {
      child.innerHTML = array[i][1]; // display "standard" fields
    }
    append(parent, child);
  }
  if (array[i][0] == "replyCode") { // specific display for one of the 2 dicarded fields
      const p = createNode("p");
      p.setAttribute("id", array[i][0]);
      p.innerHTML = array[i][1];
      append(parent, p);
  }
}

export function append(parent, el) {
  return parent.appendChild(el);
}

export function createNode(el) {
  return document.createElement(el);
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
