let Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

// create an engine
let engine = Engine.create();

// create a renderer
let render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: 650,
    height: 500,
    wireframes: true,
    showVelocity: true,
    
  }
});

// create two boxes and a ground
let boxA = Bodies.rectangle(100,400,40,40);
let boxB = Bodies.rectangle(450,400,40,40);
let ground = Bodies.rectangle(200, 600, 1560, 60, {isStatic: true});
let ceil = Bodies.rectangle(600, 0, 1560, 60, {isStatic: true});
let lWall = Bodies.rectangle(0, 600, 60, 1560, {isStatic: true});
let rWall = Bodies.rectangle(800, 500, 60, 1560, {isStatic: true});
let stack = Matter.Composites.stack(2,100,9,4,50,50, function(x,y) {
  return Bodies.circle(300,300,15);
});

// constraints
let mouse = Matter.Mouse.create(render.canvas);
let mouseConstraint = Matter.MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    render: {visible: false}
  }
});
render.mouse = mouse;

// add all of the bodies to the world
Composite.add(engine.world, [boxA, boxB, ground, ceil, lWall, rWall,  mouseConstraint, stack]);

// run the renderer
Render.run(render);

// create runner
let runner = Runner.create();

// run the engine
Runner.run(runner, engine);

Render.lookAt(render, {
  min: { x: 0, y: 0 },
  max: { x: 800, y: 600 }
});



