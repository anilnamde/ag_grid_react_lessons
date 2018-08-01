import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
                {
                    field: "category",
                    rowGroupIndex: 1,
                    hide: true
                },
                {
                    field: "price",
                    aggFunc: "sum",
                    valueFormatter: poundFormatter
                },
                { field: "zombies" },
                { field: "style" },
                { field: "clothes" },
                { field: "created" }
            ],
            defaultColDef: { width: 100 },
            groupDefaultExpanded: 1,
            rowData: getInitialRowData(),
            rowSelection: "multiple",
            getRowClass: function(params) {
                var rowNode = params.node;
                if (rowNode.group) {
                    switch (rowNode.key) {
                        case "In Workshop":
                            return "category-in-workshop";
                        case "Sold":
                            return "category-sold";
                        case "For Sale":
                            return "category-for-sale";
                        default:
                            return null;
                    }
                } else {
                    return null;
                }
            },
            autoGroupColumnDef: {
                headerName: "Group",
                field: "model",
                rowGroupIndex: 1,
                cellRenderer: "agGroupCellRenderer",
                cellRendererParams: { checkbox: true }
            },
            onGridReady: function(params) {
                params.api.sizeColumnsToFit();
            }
        };
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        params.api.sizeColumnsToFit();
    }

    getRowData() {
        var rowData = [];
        this.gridApi.forEachNode(function(node) {
            rowData.push(node.data);
        });
        console.log("Row Data:");
        console.log(rowData);
    }
    onAddRow(category) {
        var rowDataItem = createNewRowData(category);
        this.gridApi.updateRowData({ add: [rowDataItem] });
    }
    onMoveToGroup(category) {
        var selectedRowData = this.gridApi.getSelectedRows();
        selectedRowData.forEach(function(dataItem) {
            dataItem.category = category;
        });
        this.gridApi.updateRowData({ update: selectedRowData });
    }
    onRemoveSelected() {
        var selectedRowData = this.gridApi.getSelectedRows();
        this.gridApi.updateRowData({ remove: selectedRowData });
    }
    render() {
        console.log('People:render');
        return (
            <div style={{ width: "100%", height: "100%" }}>
                <div style={{ height: "100%", boxSizing: "border-box" }}>
                    <div
                        id="myGrid"
                        style={{
                            boxSizing: "border-box",
                            height: "100%",
                            width: "100%"
                        }}
                        className="ag-theme-balham"
                    >
                        <AgGridReact
                            columnDefs={this.state.columnDefs}
                            defaultColDef={this.state.defaultColDef}
                            groupDefaultExpanded={this.state.groupDefaultExpanded}
                            rowData={this.state.rowData}
                            rememberGroupStateWhenNewData={true}
                            enableSorting={true}
                            suppressRowClickSelection={true}
                            rowSelection={this.state.rowSelection}
                            animateRows={true}
                            groupSelectsChildren={true}
                            getRowClass={this.state.getRowClass}
                            autoGroupColumnDef={this.state.autoGroupColumnDef}
                            onGridReady={this.state.onGridReady}
                            onGridReady={this.onGridReady.bind(this)}
                        />
                    </div>
                </div>

                <div>
                    <div>
                        <button class="bt-action" onClick={this.onAddRow.bind(this, "For Sale")}>
                            Add For Sale
                        </button>
                        <button class="bt-action" onClick={this.onAddRow.bind(this, "In Workshop")}>
                            Add In Workshop
                        </button>
                        <button class="bt-action" onClick={this.onRemoveSelected.bind(this)}>
                            Remove Selected
                        </button>
                        <button class="bt-action" onClick={this.onMoveToGroup.bind(this, "For Sale")}>
                            Move to For Sale
                        </button>
                    </div>
                    <div style={{ marginTop: "4px" }}>
                        <button class="bt-action" onClick={this.onMoveToGroup.bind(this, "In Workshop")}>
                            Move to In Workshop
                        </button>
                        <button class="bt-action" onClick={this.onMoveToGroup.bind(this, "Sold")}>
                            Move to Sold
                        </button>
                        <button class="bt-action" onClick={this.getRowData.bind(this)}>
                            Get Row Data
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

function poundFormatter(params) {
    return (
        "\xA3" +
        Math.floor(params.value)
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    );
}

function getInitialRowData() {
    var rowData = [];
    for (var i = 0; i < 12; i++) {
        var category = categories[i % categories.length];
        rowData.push(createNewRowData(category));
    }
    return rowData;
}
var names = ["Elly", "Shane", "Niall", "Rob", "John", "Sean", "Dicky", "Willy", "Shaggy", "Spud", "Sugar", "Spice"];

var models = [
    "Mondeo",
    "Celica",
    "Boxter",
    "Minty",
    "Snacky",
    "FastCar",
    "Biscuit",
    "Whoooper",
    "Scoooper",
    "Jet Blaster"
];

var categories = ["Sold", "For Sale", "In Workshop"];

function createNewRowData(category) {
    var newData = {
        category: category,
        model: models[Math.floor(Math.random() * models.length)],
        price: Math.floor(Math.random() * 800000) + 20000,
        zombies: names[Math.floor(Math.random() * names.length)],
        style: "Smooth",
        clothes: "Jeans",
        created: new Date().getTime()
    };
    return newData;
}
