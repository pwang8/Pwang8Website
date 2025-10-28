import React, { Component } from "react";
import Project from "./Project";

class Portfolio extends Component {
  render() {
    return (
      <section id="portfolio">
        <div className="row">
            <div id="portfolio-wrapper" className="cf">
              <h1>Project</h1>
              <p>A quick game built so there would be something going to the database. It's quite fun. Please be respectful when submitting names, as they are displayed to all users, thanks!</p>
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
