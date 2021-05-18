import React, { Component } from "react";
import Project from "./Project";

class Portfolio extends Component {
  render() {
    return (
      <section id="portfolio">
        <div className="row">
            <div id="portfolio-wrapper" className="cf">
              <h1>Project</h1>
              <p>Scores are stored on AWS Dynamo-DB and displayed for all visitors of the site. I ask that you be respectful when submitting names alongside your score. It's a silly game but have fun!</p>
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
