import * as mJs from "./main.js";
const docIdReplyTopicForm = document.querySelector("#replyTopicForm");
const docIdTopicInfos = document.querySelector("#topicInfos");
const docIdTopicText = document.querySelector("#topicText");
const docIdRepliesList = document.querySelector("#repliesList");
const docIdReplyTopicButton = document.querySelector("#replyTopicButton");

document.onload = onLoad();

function onLoad() {
  //check url pathname (html page) to avoid some annoying interractions between the 2 pages scripts execution
  if(window.location.pathname == "/topic.html") {
    const topicPostId = sessionStorage.getItem('topicPostId');
    const topicData = sessionStorage.getItem('topicData');
    
    displayTopic(topicData);
    
    docIdReplyTopicForm.addEventListener("submit", (e) => {
        e.preventDefault();
        mJs.submitBehavior(docIdReplyTopicForm);    
      },
      false
    );
  }
}

function displayTopic(jsonTopic) {
  console.log(jsonTopic);
  const topic = Object.entries(JSON.parse(jsonTopic));  
  console.log(topic);
  for (let i = 0; i < topic.length; i++) {
    if (topic[i][0] == "topicMsg") {
      docIdTopicText.innerHTML = topic[i][1];
    } else if (topic[i][0] == "replies") {
      topic[i][1].forEach(reply => {
        displayReply (Object.entries(reply));        
      });
    } else {
      mJs.createChildWithIdAndValueFromArray(docIdTopicInfos, "span", topic, i);
    }    
    sessionStorage.removeItem('topicData');
  }
}

function displayNewReply (jsonReply) {
  const reply = Object.entries(JSON.parse(jsonReply));
  displayReply (reply);
}

function displayReply (reply) {
  console.log(reply);
  const li = mJs.createNode("li");
  mJs.append(docIdRepliesList, li);
  for (let i = 0; i < reply.length; i++) {
    mJs.createChildWithIdAndValueFromArray(li, "span", reply, i);
  }
}

export function newReplySuccess(jsonReply) {
  displayNewReply(jsonReply);
  docIdReplyTopicForm.reset();
}
