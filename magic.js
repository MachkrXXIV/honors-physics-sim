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
    width: 1260,
    height: 520,
    wireframes: false
  }
});


// create two boxes and a ground
let boxA = Bodies.rectangle(100,200,80,80);
let boxB = Bodies.rectangle(450,50,80,80);
let ground = Bodies.rectangle(600, 500, 1560, 60, {isStatic: true});

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
Composite.add(engine.world, [boxA, boxB, ground, mouseConstraint]);

// run the renderer
Render.run(render);

// create runner
let runner = Runner.create();

// run the engine
Runner.run(runner, engine);

