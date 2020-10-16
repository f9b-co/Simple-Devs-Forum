import * as mJs from "./main.js";
const docIdReplyTopicForm = document.querySelector("#replyTopicForm");
const docIdTopicInfos = document.querySelector("#topicInfos");
const docIdTopicText = document.querySelector("#topicText");
const docIdRepliesList = document.querySelector("#repliesList");
const docIdReplyTopicButton = document.querySelector("#replyTopicButton");


window.addEventListener("DOMContentLoaded", (event) => {
  const newTopicData = sessionStorage.getItem('newTopicData');
  const currentNewTopic = sessionStorage.getItem('currentNewTopic');
  const topicToLoad = sessionStorage.getItem('topicToLoad');
  const topicData = newTopicData;//(mJs.notNullCheck(newTopicData))? newTopicData : loadTopic(topicToLoad);

  displayTopic(topicData);  
  
/*   (mJs.notNullCheck(newTopicData))? 
    sessionStorage.removeItem('newTopicData'):
    sessionStorage.removeItem('topicToLoad'); */

/*   docIdReplyTopicButton.addEventListener(
    "click", (e) => {
      docIdReplyTopicForm.setAttribute("hidden", false);
    },
    false
  ); */
  docIdReplyTopicForm.addEventListener("submit", (e) => {
      e.preventDefault();
      mJs.submitBehavior(docIdReplyTopicForm);    
    },
    false
  );
});

function loadTopic (topicId){
  //mJs.orderAndServe(mJs.setUrlEndpoint("/topics/", topicId), mJs.fetchesParams[0], displayTopic);
}

function displayTopic(jsonTopic) {
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
