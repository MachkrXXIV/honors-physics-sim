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
let boxA = Bodies.rectangle(100,400,40,40);
let boxB = Bodies.rectangle(450,400,40,40);
let ground = Bodies.rectangle(600, 500, 1560, 60, {isStatic: true});
let ceil = Bodies.rectangle(600, 20, 1560, 60, {isStatic: true});

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
Composite.add(engine.world, [boxA, boxB, ground, ceil, mouseConstraint]);

// run the renderer
Render.run(render);

// create runner
let runner = Runner.create();

// run the engine
Runner.run(runner, engine);

