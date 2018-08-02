import React, { Component } from 'react';
import './App.css';
import 'react-tabs/style/react-tabs.css';
import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import Places from './Places';
import People from './People';


const names = ['Elly', 'Shane', 'Niall', 'Rob', 'John', 'Sean', 'Dicky', 'Willy', 'Shaggy', 'Spud', 'Sugar', 'Spice'];

const models = [
  'Mondeo',
  'Celica',
  'Boxter',
  'Minty',
  'Snacky',
  'FastCar',
  'Biscuit',
  'Whoooper',
  'Scoooper',
  'Jet Blaster',
];

const categories = ['Sold', 'For Sale', 'In Workshop'];

function poundFormatter(params) {
  return (
    `\xA3${
      Math.floor(params.value)
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`
  );
}

function createNewRowData(category, index) {
  const newData = {
    index,
    category,
    model: models[Math.floor(Math.random() * models.length)],
    price: Math.floor(Math.random() * 800000) + 20000,
    zombies: names[Math.floor(Math.random() * names.length)],
    style: 'Smooth',
    clothes: 'Jeans',
    created: new Date().getTime(),
  };
  return newData;
}

function getInitialRowData() {
  const rowData = [];
  for (let i = 0; i < 12; i++) {
    const category = categories[i % categories.length];
    rowData.push(createNewRowData(category, i));
  }
  return rowData;
}


const props = {
  columnDefs: [
    {
      field: 'category',
      rowGroupIndex: 1,
      hide: true,
    },
    {
      field: 'price',
      aggFunc: 'sum',
      valueFormatter: poundFormatter,
    },
    { field: 'zombies' },
    { field: 'style' },
    { field: 'clothes' },
    { field: 'created' },
  ],
  defaultColDef: { width: 100 },
  groupDefaultExpanded: 1,
  rowData: getInitialRowData(),
  rowSelection: 'multiple',
  getRowClass(params) {
    const rowNode = params.node;
    if (rowNode.group) {
      switch (rowNode.key) {
        case 'In Workshop':
          return 'category-in-workshop';
        case 'Sold':
          return 'category-sold';
        case 'For Sale':
          return 'category-for-sale';
        default:
          return null;
      }
    } else {
      return null;
    }
  },
  autoGroupColumnDef: {
    headerName: 'Group',
    field: 'model',
    rowGroupIndex: 1,
    cellRenderer: 'agGroupCellRenderer',
    cellRendererParams: { checkbox: true },
  },
  onGridReady(params) {
    params.api.sizeColumnsToFit();
  },
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRows: [],
    };
  }

  render() {
    return (
      <div className="App">
        <Tabs>
          <TabList>
            <Tab>
Person
            </Tab>
            <Tab>
Places
            </Tab>
          </TabList>
          <TabPanel>
            <h2>
Person
            </h2>
            <People
              {...props}
              selectedRows={this.state.selectedRows}
              onChange={(selectedRows) => {
                console.log('People:onChange', selectedRows);
                this.setState({
                  selectedRows: selectedRows.map(o => o.index),
                });
              }}
            />
          </TabPanel>
          <TabPanel>
            <h2>
Places
            </h2>
            <Places {...props} />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}
