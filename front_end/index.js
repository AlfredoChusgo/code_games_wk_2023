
//import { columns1, data1 } from './data_source/us_investor_flow_of_funds_into_investment_classes';
//import {columns2,data2} from './data_source/world_happines';

const dataSourcesList = [{id:1,name:"US Investor Flow of Funds into Investment Classes"}, {id:2,name:"TestData2"}, {id:3,name:"TestData3"}, {id:4,name:"TestData4"}];

$('#dataSourceList').dxSelectBox({
    dataSource: dataSourcesList,
    value: dataSourcesList[0],
    valueExpr: "id",
    displayExpr: "name",
    onValueChanged(data) {
      //if (data.value === 'All') { dataGrid.clearFilter(); } else { dataGrid.filter(['Task_Status', '=', data.value]); }
      console.log(data);
      let columns = null ;
      let data = null;
      switch (data.value) {
        case 1:
          columns = columns1;
          data = data1;
          break;
        case 2:
            // columns = columns2;
            // data = data2;
          break;
        case 3:
          day = "Wednesday";
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
        dataSource: data,
        columns: columns
      });
    },
  });

  const grid = $('#gridContainer').dxDataGrid({
    dataSource: {
      store: {
        type: 'odata',
        url: 'https://js.devexpress.com/Demos/SalesViewer/odata/DaySaleDtoes',
        key: 'Id',
        beforeSend(request) {
          const year = new Date().getFullYear() - 1;
          request.params.startDate = `${year}-05-10`;
          request.params.endDate = `${year}-5-15`;
        },
      },
    },
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
    columns: [
      {
        dataField: 'Product',
        groupIndex: 0,
      },
      {
        dataField: 'Amount',
        caption: 'Sale Amount',
        dataType: 'number',
        format: 'currency',
        alignment: 'right',
      },
      {
        dataField: 'Discount',
        caption: 'Discount %',
        dataType: 'number',
        format: 'percent',
        alignment: 'right',
        allowGrouping: false,
        cellTemplate: discountCellTemplate,
        cssClass: 'bullet',
      },
      {
        dataField: 'SaleDate',
        dataType: 'date',
      },
      {
        dataField: 'Region',
        dataType: 'string',
      },
      {
        dataField: 'Sector',
        dataType: 'string',
      },
      {
        dataField: 'Channel',
        dataType: 'string',
      },
      {
        dataField: 'Customer',
        dataType: 'string',
        width: 150,
      },
    ],
    onContentReady(e) {
      if (!collapsed) {
        collapsed = true;
        e.component.expandRow(['EnviroCare']);
      }
    },
  });

// $(() => {
    
//   });
  
  const discountCellTemplate = function (container, options) {
    $('<div/>').dxBullet({
      onIncidentOccurred: null,
      size: {
        width: 150,
        height: 35,
      },
      margin: {
        top: 5,
        bottom: 0,
        left: 5,
      },
      showTarget: false,
      showZeroLevel: true,
      value: options.value * 100,
      startScaleValue: 0,
      endScaleValue: 100,
      tooltip: {
        enabled: true,
        font: {
          size: 18,
        },
        paddingTopBottom: 2,
        customizeTooltip() {
          return { text: options.text };
        },
        zIndex: 5,
      },
    }).appendTo(container);
  };
  
  let collapsed = false;
  