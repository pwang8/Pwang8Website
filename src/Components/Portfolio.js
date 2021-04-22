import React, { Component } from "react";
import Project from "./Project";

class Portfolio extends Component {
  render() {
    return (
      <section id="portfolio">
        <div className="row">
            <h1>Currently working on a full-stack project (WIP)</h1>

            <div id="portfolio-wrapper" className="cf">
              <h1> hello</h1>
              <Project/>
            </div>
        </div>
      </section>
    );
  }
}

export default Portfolio;
