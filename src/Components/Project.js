import React, { Component } from "react";
import Matter from "matter-js";
import Leaderboard from "./Leaderboard";

class Project extends Component {
    constructor(props){
        super(props);
        this.state = {
            score: 0
        }
        this.gameDivRef = React.createRef();
    }

    componentDidMount() {
        const WINDOW_HEIGHT = document.getElementById("game-div").offsetHeight ? document.getElementById("game-div").offsetHeight : this.props.defaultCanvasHeight;
        const WINDOW_WIDTH = document.getElementById("game-div").offsetWidth ? document.getElementById("game-div").offsetWidth : this.props.defaultCanvasWidth;
        const PLATFORM_X = WINDOW_WIDTH*0.75;
        const PLATFORM_Y = WINDOW_HEIGHT*0.6;
        const PLATFORM_WIDTH = WINDOW_WIDTH*0.35;
        const BALL_X = WINDOW_WIDTH*0.3;
        const BALL_Y = WINDOW_HEIGHT*0.5;
        const BALL_SIZE = WINDOW_WIDTH/50;
        const SQUARE_SIZE = WINDOW_WIDTH/40;

        let Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Bodies = Matter.Bodies,
        Composite = Matter.Composite;
        
        // create an engine
        var engine = Engine.create();
    
        // create a renderer
        var render = Render.create({
            element: this.gameDivRef.current,
            engine: engine,
            options: {
                width: WINDOW_WIDTH,
                height: WINDOW_HEIGHT,
                wireframes: false
            }
        });
    
        // create bodies
        var ground = Bodies.rectangle(PLATFORM_X, PLATFORM_Y, PLATFORM_WIDTH, 20, { isStatic: true });

        let ball = Matter.Bodies.circle(BALL_X,BALL_Y,BALL_SIZE,{
            density:0.002
        });
        let sling = Matter.Constraint.create({
            pointA: {x:BALL_X, y:BALL_Y},
            bodyB: ball,
            stiffness: 0.4,
        });

        //x-100 and y-210 to offset the platform and height/width of the stack (10x10 of 20l squares)
        let stack = Matter.Composites.stack(PLATFORM_X-(SQUARE_SIZE*5),PLATFORM_Y-(5+SQUARE_SIZE*10),10,10,0,0, (x,y)=>{
            return Matter.Bodies.rectangle(x,y,SQUARE_SIZE,SQUARE_SIZE,{
                density: 0.0008
                // render:{
                //     visible
                // },
                // wireframe: false
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

        let remainingLives = 3;
        let firing = false;
        Matter.Events.on(mouseConstraint, 'startdrag', (e)=>{
            if(e.body !== ball) e.body.isStatic = true;
        });
        Matter.Events.on(mouseConstraint, 'enddrag', (e)=>{
            if(e.body === ball) firing = true;
            if(e.body !== ball) e.body.isStatic = false;
        });
        Matter.Events.on(engine, 'afterUpdate', ()=>{
            //Logic pertaining to the slingshot and lives
            if(firing && Math.abs(ball.position.x-BALL_X)<20 && Math.abs(ball.position.y-BALL_Y)<20){
                ball = Matter.Bodies.circle(BALL_X, BALL_Y, BALL_SIZE,{
                    density:0.002
                });
                remainingLives--;
                if(remainingLives > 0){
                    Matter.World.add(engine.world,ball);
                    sling.bodyB = ball;
                }
                else{
                    Matter.World.remove(engine.world,ball);
                    sling.bodyB = null;
                }
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
            <div id="project-wrapper" className="align-center">
                <div id="game-div" className="" ref={this.gameDivRef}></div>
                <Leaderboard score={this.state.score}/>
            </div>
        );
    }
}

export default Project;
