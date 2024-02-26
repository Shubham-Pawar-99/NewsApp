import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import News from './component/News';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<News key="general" pageSize={4} category="general" />} />
            <Route exact path="/technology" element={<News key="technology" pageSize={4} category="technology" />} />
            <Route exact path="/business" element={<News key="business" pageSize={4} category="business" />} />
            <Route exact path="/entertainment" element={<News key="entertainment" pageSize={4} category="entertainment" />} />
            <Route exact path="/general" element={<News key="general" pageSize={4} category="general" />} />
            <Route exact path="/health" element={<News key="health" pageSize={4} category="health" />} />
            <Route exact path="/science" element={<News key="science" pageSize={4} category="science" />} />
            <Route exact path="/sports" element={<News key="sports" pageSize={4} category="sports" />} />
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
