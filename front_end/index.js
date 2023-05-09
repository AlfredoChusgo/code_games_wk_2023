
import { columns1, data1 } from './data_source/us_investor_flow_of_funds_into_investment_classes';
import {columns2,data2} from './data_source/world_happines';
import {columns3,data3} from './data_source/risk_control_matrix';

const dataSourcesList = [{id:1,name:"US Investor Flow of Funds into Investment Classes"}, {id:2,name:"World Happines"}, {id:3,name:"Risk Control Matrix"}, {id:4,name:"TestData4"}];

$('#dataSourceList').dxSelectBox({
    dataSource: dataSourcesList,
    value: dataSourcesList[0],
    valueExpr: "id",
    displayExpr: "name",
    onValueChanged(data) {
      //if (data.value === 'All') { dataGrid.clearFilter(); } else { dataGrid.filter(['Task_Status', '=', data.value]); }
      console.log(data);
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
          day = "Thursday";
          break;
        case 5:
          day = "Friday";
          break;
        case 6:
          day = "Saturday";
      }
      grid.option({
        dataSource: dataSource,
        columns: columns
      });
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

  
  let collapsed = false;
  


  const popupOptions = {
    width: 660,
    height: 540,
    contentTemplate() {
      const result = $(_.template($('#property-details').html())(currentHouse));
      const button = result.find('#favorites')
        .dxButton(buttonOptions)
        .dxButton('instance');
      setButtonText(button, currentHouse.Favorite);
      return result;
    },
    showTitle: true,
    visible: false,
    dragEnabled: false,
    hideOnOutsideClick: true,
  };



  function addMessage(item){
    const chatMessages = document.getElementById('chat-messages');
    const chatMessage = document.createElement('div');
    chatMessage.classList.add('chat-message');
    
    // Set the appropriate class based on the role of the sender
    if (item.role === 'sender') {
      chatMessage.classList.add('sent');
    } else {
      chatMessage.classList.add('received');
    }
    
    chatMessage.innerHTML = `
      <div class="message-header">${item.author}</div>
      <div class="message-body">${item.message}</div>
      <div class="message-timestamp">${item.timestamp}</div>
    `;
    chatMessages.appendChild(chatMessage);

  }


  // Get the button element
const sendButton = document.getElementById("sendBtn");

// Define the click event handler function
function handleClick(event) {
    
    event.preventDefault();
    const messageBox = document.getElementById('messageBox');
    addMessage({author:"chatGPT",message:messageBox.value,timestamp : Date.now()});
    messageBox.value = "";
}

// Bind the click event to the button
sendButton.addEventListener("click", handleClick);