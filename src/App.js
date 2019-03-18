import React, { Component } from 'react';
import "./App.css"
import ActivityList from "./components/ActivityList"
const activity_data = require("./data/activity_feed.json");


class App extends Component {

  state = {
    tasks:activity_data.tasks,
    profiles:activity_data.profiles,
    activity_feed:activity_data.activity_feed
  }

  render() {
    return (
      <div className="list-tutorial">
        <ActivityList  tasks={ this.state.tasks } profiles={this.state.profiles} activity_feed={this.state.activity_feed} />
    </div>
    );
  }
}

export default App;
