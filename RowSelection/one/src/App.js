import React, { Component } from 'react';
import './App.css';
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Places from './Places';
import People from './People';

export default class App extends Component {
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
                <h2>Person</h2>
                <People />
            </TabPanel>
            <TabPanel>
                <h2>Places</h2>
                <Places />
            </TabPanel>
        </Tabs>
      </div>
    );
  }
}
