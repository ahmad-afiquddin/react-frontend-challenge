import React, { Component } from 'react';

class ActivityList extends Component {
  state = {
    text:"Mouse over a user or task to get their path."
  }

  constructor(props) {
    super(props);
    this.indexById = (map, { id, name }) => map.set(id, name);
    this.createFeed = this.createFeed.bind(this);
    this.replaceField = this.replaceField.bind(this);
  }

  displayPath(path)
  {
    this.setState({text:path});
  }

  displayGeneric()
  {
    this.setState({text:"Mouse over a user or task to get their path."});
  }

  replaceField(template)
  {
    let parts = template.split(/\{ (\w+:\w+) \}/g);
    for (let i = 1; i < parts.length; i++) {
      if (parts[i].match(/(\w+:\w+)/g))
      {
        let field = parts[i].split(/(\w+):(\w+)/g)[1]
        let value = parts[i].split(/(\w+):(\w+)/g)[2]
        let tempStr = "";
        let path = "";
        switch(field)
        {
          case("profiles"):
            tempStr = this.props.profiles.find(profile => profile.id === parseInt(value, 10)).abbreviated_name;
            path = "/users/" + this.props.profiles.find(profile => profile.id === parseInt(value, 10)).slug;
            break;
          case("task"):
            tempStr = this.props.tasks.find(task => task.id === parseInt(value, 10)).name;
            path = "/tasks/" + this.props.tasks.find(task => task.id === parseInt(value, 10)).slug;
            break;
          default:
            tempStr = "";
            break;
        }
        parts[i] = <button onMouseOver={this.displayPath.bind(this, path)} onMouseOut={this.displayGeneric.bind(this)}>{ tempStr }</button>
      }
      else
      {
          parts[i] = parts[i].toUpperCase();
      }
    }
    return parts
  }

  createFeed(template)
  {
    //var returnTemplate = template.replace(/\{ (\w+):(\w+) \}/g, this.replaceField);
    var returnTemplate = this.replaceField(template);
    return (returnTemplate);
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.activity_feed.map(activity => (<li>{ this.createFeed(activity.template) }</li>))}
        </ul>
        <p id="path-text">{ this.state.text }</p>
      </div>
    );
  }
}

export default ActivityList;
