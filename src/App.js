import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import News from './component/News';

export default class App extends Component {
  pageSize = 12;
  render() {

    return (
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<News key="general" pageSize={this.pageSize} category="general" />} />
            <Route exact path="/technology" element={<News key="technology" pageSize={this.pageSize} category="technology" />} />
            <Route exact path="/business" element={<News key="business" pageSize={this.pageSize} category="business" />} />
            <Route exact path="/entertainment" element={<News key="entertainment" pageSize={this.pageSize} category="entertainment" />} />
            <Route exact path="/general" element={<News key="general" pageSize={this.pageSize} category="general" />} />
            <Route exact path="/health" element={<News key="health" pageSize={this.pageSize} category="health" />} />
            <Route exact path="/science" element={<News key="science" pageSize={this.pageSize} category="science" />} />
            <Route exact path="/sports" element={<News key="sports" pageSize={this.pageSize} category="sports" />} />
            <Route path="/" element={<DefaultComponent />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

const DefaultComponent = () => {
  return <div>This is the default component for the root path.</div>;
};
