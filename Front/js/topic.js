import * as mJs from "./main.js";
const docIdReplyTopicForm = document.querySelector("#replyTopicForm");
const docIdTopicInfos = document.querySelector("#topicInfos");
const docIdTopicText = document.querySelector("#topicText");
const docIdRepliesList = document.querySelector("#repliesList");
const docIdReplyTopicButton = document.querySelector("#replyTopicButton");


window.addEventListener("DOMContentLoaded", (event) => {
  const topicPostId = sessionStorage.getItem('topicPostId');
  const topicData = sessionStorage.getItem('topicData');;

  displayTopic(topicData);  
  
  docIdReplyTopicForm.addEventListener("submit", (e) => {
      e.preventDefault();
      mJs.submitBehavior(docIdReplyTopicForm);    
    },
    false
  );
});

function displayTopic(jsonTopic) {
  console.log(jsonTopic);
  const topic = Object.entries(JSON.parse(jsonTopic));  
  for (let i = 0; i < topic.length; i++) {
    if (topic[i][0] == "topicMsg") {
      docIdTopicText.innerHTML = topic[i][1];
    } else if (topic[i][0] == "repliesList") {
      topic[i][0].forEach(reply => { 
        const li = mJs.createNode("li");
        mJs.append(docIdRepliesList, li);
        displayReply (reply);        
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
