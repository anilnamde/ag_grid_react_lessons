import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';

export default class extends Component {
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();
  }
  //
  // getRowData() {
  //   const rowData = [];
  //   this.gridApi.forEachNode((node) => {
  //     rowData.push(node.data);
  //   });
  //   console.log('Row Data:');
  //   console.log(rowData);
  // }

  // onAddRow(category) {
  //   const rowDataItem = createNewRowData(category);
  //   this.gridApi.updateRowData({ add: [rowDataItem] });
  // }

  // onMoveToGroup(category) {
  //   const selectedRowData = this.gridApi.getSelectedRows();
  //   selectedRowData.forEach((dataItem) => {
  //     dataItem.category = category;
  //   });
  //   this.gridApi.updateRowData({ update: selectedRowData });
  // }
  //
  // onRemoveSelected() {
  //   const selectedRowData = this.gridApi.getSelectedRows();
  //   this.gridApi.updateRowData({ remove: selectedRowData });
  // }

  render() {
    console.log('Places:render');
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div style={{ height: '100%', boxSizing: 'border-box' }}>
          <div
            id="myGrid"
            style={{
              boxSizing: 'border-box',
              height: '100%',
              width: '100%',
            }}
            className="ag-theme-balham"
          >
            <AgGridReact
              columnDefs={this.props.columnDefs}
              defaultColDef={this.props.defaultColDef}
              groupDefaultExpanded={this.props.groupDefaultExpanded}
              rowData={this.props.rowData}
              rememberGroupStateWhenNewData
              enableSorting
              suppressRowClickSelection
              rowSelection={this.props.rowSelection}
              animateRows
              groupSelectsChildren
              getRowClass={this.props.getRowClass}
              autoGroupColumnDef={this.props.autoGroupColumnDef}
              onGridReady={this.props.onGridReady}
              onGridReady={this.onGridReady.bind(this)}
            />
          </div>
        </div>

        {/* <div> */}
        {/* <div> */}
        {/* <button className="bt-action" onClick={this.onAddRow.bind(this, 'For Sale')}> */}
        {/* Add For Sale */}
        {/* </button> */}
        {/* <button className="bt-action" onClick={this.onAddRow.bind(this, 'In Workshop')}> */}
        {/* Add In Workshop */}
        {/* </button> */}
        {/* <button className="bt-action" onClick={this.onRemoveSelected.bind(this)}> */}
        {/* Remove Selected */}
        {/* </button> */}
        {/* <button className="bt-action" onClick={this.onMoveToGroup.bind(this, 'For Sale')}> */}
        {/* Move to For Sale */}
        {/* </button> */}
        {/* </div> */}
        {/* <div style={{ marginTop: '4px' }}> */}
        {/* <button className="bt-action" onClick={this.onMoveToGroup.bind(this, 'In Workshop')}> */}
        {/* Move to In Workshop */}
        {/* </button> */}
        {/* <button className="bt-action" onClick={this.onMoveToGroup.bind(this, 'Sold')}> */}
        {/* Move to Sold */}
        {/* </button> */}
        {/* <button className="bt-action" onClick={this.getRowData.bind(this)}> */}
        {/* Get Row Data */}
        {/* </button> */}
        {/* </div> */}
        {/* </div> */}

      </div>
    );
  }
}
