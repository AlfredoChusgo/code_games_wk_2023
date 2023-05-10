import { columns1, data1 } from './data_source/us_investor_flow_of_funds_into_investment_classes';
import {columns2,data2} from './data_source/world_happines';
import {columns3,data3} from './data_source/risk_control_matrix';
import {columns4,data4} from './data_source/products';
import config from './config.js';

const dataSourcesList = [{id:1,name:"US Investor Flow of Funds into Investment Classes"}, {id:2,name:"World Happines"}, {id:3,name:"Risk Control Matrix"}, {id:4,name:"Products"}];
window.messages = [];
$('#dataSourceList').dxSelectBox({
    dataSource: dataSourcesList,
    value: dataSourcesList[0],
    valueExpr: "id",
    displayExpr: "name",
    onValueChanged(data) {            
      let columns = null ;
      let dataSource = null;
      switch (data.value) {
        case 1:
          columns = columns1;
          dataSource = data1;          
          break;
        case 2:
            columns = columns2;
            dataSource = data2;
          break;
        case 3:
            columns = columns3;
            dataSource = data3;
          break;
        case 4:
            columns = columns4;
            dataSource = data4;
          break;
        case 5:
          day = "Friday";
          break;
        case 6:
          day = "Saturday";
      }
      addDataSourceToMessages(dataSource);
      grid.option({
        dataSource: dataSource,
        columns: columns
      });
      updateHtmlMessages();
    },
  });

  window.grid = $('#gridContainer').dxDataGrid({
    dataSource: data1,
    columns:columns1,
    paging: {
      pageSize: 10,
    },
    pager: {
      showPageSizeSelector: true,
      allowedPageSizes: [10, 25, 50, 100],
    },
    remoteOperations: false,
    searchPanel: {
      visible: true,
      highlightCaseSensitive: true,
    },
    groupPanel: { visible: true },
    grouping: {
      autoExpandAll: false,
    },
    allowColumnReordering: true,
    rowAlternationEnabled: true,
    showBorders: true,
    onContentReady(e) {
      if (!collapsed) {
        collapsed = true;
        e.component.expandRow(['EnviroCare']);
      }
    },
  }).dxDataGrid('instance');

  
  window.loadPanel = $('.loadpanel').dxLoadPanel({
    shadingColor: 'rgba(0,0,0,0.4)',
    position: { of: '#chat-messages' },
    visible: false,
    showIndicator: true,
    showPane: true,
    shading: true,
    hideOnOutsideClick: false,
    onShown() {
      // setTimeout(() => {
      //   loadPanel.hide();
      // }, 3000);
    },
    onHidden() {
      
    },
  }).dxLoadPanel('instance');

  let collapsed = false;
  
  const sendButton = document.getElementById("sendBtn");
  const messageBox = document.getElementById('messageBox');
  messageBox.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission if needed
      sendButton.click(); // Programmatically click the button
    }
  });
  //chat section 
  
  function addDataSourceToMessages(dataSource){
     const message = {role:'user',content:`data: ${JSON.stringify(dataSource)}`};
     messages = [message];
  }


  function addMessageToArray(messageText){
    const newMessage = {"role":"user","content":`${messageText}`};
    messages.push(newMessage);

    loadPanel.show();
    fetch(config.apiUrl,{
      method: 'POST',
      headers:{
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({messages})
    })
    .then(res=> res.json())
    .then(data=>{
      loadPanel.hide();
      let newAsistantMessage = {"role":"assistant","content":`${data.completion.content}`}
      messages.push(newAsistantMessage);
      updateHtmlMessages();
    })
  }

  function updateHtmlMessages(){
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.innerHTML = '';
    const copyMessages = [...messages];
    copyMessages.shift();
    copyMessages.forEach(e=>{
      addMessage(e);
    });
    
  }
  function addMessage(item){ 
    const chatMessages = document.getElementById('chat-messages');
    const chatMessage = document.createElement('div');
    chatMessage.classList.add('chat-message');
    
    // Set the appropriate class based on the role of the sender
    if (item.role === 'user') {
      chatMessage.classList.add('sent');
    } else {
      chatMessage.classList.add('received');
    }
    
    chatMessage.innerHTML = `
      <div class="message-header">${item.role}</div>
      <div class="message-body">${item.content}</div>      
    `;
    chatMessages.appendChild(chatMessage);

    chatMessages.scrollTop = chatMessages.scrollHeight;

    
  }


  // Get the button element
//const sendButton = document.getElementById("sendBtn");

// Define the click event handler function
function handleClick(event) {
    
    event.preventDefault();
    const messageBox = document.getElementById('messageBox');
    //addMessage({role:"chatGPT",message:messageBox.value});

    addMessageToArray(messageBox.value);
    messageBox.value = "";
    messageBox.focus();
}

// Bind the click event to the button
sendButton.addEventListener("click", handleClick);

