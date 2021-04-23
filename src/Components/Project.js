import React, { Component } from "react";
import Matter from "matter-js";

class Project extends Component {
    componentDidMount() {
        let Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Bodies = Matter.Bodies,
        Composite = Matter.Composite;
        
        // create an engine
        var engine = Engine.create();
    
        // create a renderer
        var render = Render.create({
            element: this.refs.ProjectDiv,
            engine: engine,
            options: {
                width: 800,
                height: 600,
                //wireframes: false
            }
        });
    
        // create bodies
        var ground = Bodies.rectangle(600, 350, 300, 20, { isStatic: true });

        let ball = Matter.Bodies.circle(200,300,20);
        let sling = Matter.Constraint.create({
            pointA: {x:200, y:300},
            bodyB: ball,
            stiffness: 0.4,
        });

        let stack = Matter.Composites.stack(500,140,10,10,0,0, (x,y)=>{
            return Matter.Bodies.rectangle(x,y,20,20,{
                // render:{
                //     fillStyle:'#156234',
                //     strokeStyle:'orange',
                // }
            });
        });

        //set mouse constraints
        let mouse = Matter.Mouse.create(render.canvas);
        let mouseConstraint = Matter.MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                render: {
                    visible:false
                }
            }
        });
        render.mouse = mouse;

        let firing = false;
        Matter.Events.on(mouseConstraint, 'enddrag', (e)=>{
            if(e.body === ball) firing = true;
        });
        Matter.Events.on(engine, 'afterUpdate', ()=>{
            if(firing && Math.abs(ball.position.x-200)<20 && Math.abs(ball.position.y-300)<20){
                ball = Matter.Bodies.circle(200, 300, 20);
                Matter.World.add(engine.world,ball);
                sling.bodyB = ball;
                firing = false;
            }
        });
    
        // add all of the bodies to the world
        Matter.World.add(engine.world,[sling, ball]);
        Composite.add(engine.world, [stack, ground, mouseConstraint]);
    
        // run the renderer
        Render.run(render);
    
        // create runner
        var runner = Runner.create();
    
        // run the engine
        Runner.run(runner, engine);
    }

    render() {
        return (
            <div className="align-center" ref="ProjectDiv"></div>
        );
    }
}

export default Project;
