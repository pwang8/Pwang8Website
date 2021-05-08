import React, { Component } from "react";
import Project from "./Project";

class Portfolio extends Component {
  render() {
    return (
      <section id="portfolio">
        <div className="row">
            <h1>Currently working on a full-stack project (WIP)</h1>

            <div id="portfolio-wrapper" className="cf">
              <Project
                //Default Values
                defaultCanvasHeight = {600}
                defaultCanvasWidth = {600}
              />
            </div>
        </div>
      </section>
    );
  }
}

export default Portfolio;
