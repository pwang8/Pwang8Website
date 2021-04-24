import React, { Component } from "react";
import Matter from "matter-js";

class Project extends Component {
    constructor(props){
        super(props);
        this.state = {
            score: 0
        }
    }

    componentDidMount() {
        const WINDOW_HEIGHT = 600;
        const WINDOW_WIDTH = 800;

        let Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Bodies = Matter.Bodies,
        Composite = Matter.Composite;
        
        // create an engine
        var engine = Engine.create();
    
        // create a renderer
        var render = Render.create({
            element: this.refs.GameDiv,
            engine: engine,
            options: {
                width: WINDOW_WIDTH,
                height: WINDOW_HEIGHT,
                wireframes: false
            }
        });
    
        // create bodies
        var ground = Bodies.rectangle(WINDOW_HEIGHT, 350, 300, 20, { isStatic: true });

        let ball = Matter.Bodies.circle(200,300,20);
        let sling = Matter.Constraint.create({
            pointA: {x:200, y:300},
            bodyB: ball,
            stiffness: 0.4,
        });

        let stack = Matter.Composites.stack(500,140,10,10,0,0, (x,y)=>{
            return Matter.Bodies.rectangle(x,y,20,20,{
                // render:{
                //     visible
                // },
                // wireframe: false
            });
        });
        console.log(stack);

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
            //Logic pertaining to the slingshot
            if(firing && Math.abs(ball.position.x-200)<20 && Math.abs(ball.position.y-300)<20){
                ball = Matter.Bodies.circle(200, 300, 20);
                Matter.World.add(engine.world,ball);
                sling.bodyB = ball;
                firing = false;
            }

            // Logic for calculating score
            for(let i=0; i<stack.bodies.length; i++){
                if(stack.bodies[i].position.y > WINDOW_HEIGHT){
                    stack = Matter.Composite.remove(stack, stack.bodies[i]);
                    this.setState({score: this.state.score+1});
                }
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
            <div>
                <h1>Your score is: {this.state.score}</h1>
                <div className="align-center" ref="GameDiv"></div>
            </div>
        );
    }
}

export default Project;
