let Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;
let content = document.querySelector(".content");
let kilos = 15;


// create an engine
let engine = Engine.create();
engine.world.gravity.y = 1;

// create a renderer
let render = Render.create({
  element: content,
  engine: engine,
  options: {
    width: 1600,
    height: 500,
    wireframes: true,
    showVelocity: true,
    showPositions: true
  }
});

function setup() {
  // bodies; height: top(0)-bottom(600), width: -375-1175
  let ground = Bodies.rectangle(400, 600, 1600, 60, {isStatic: true});
  //let platform = Bodies.rectangle(700, 300, 360, 40, {isStatic: true});
  let ceil = Bodies.rectangle(400, 0, 1560, 60, {isStatic: true});
  let lWall = Bodies.rectangle(-375, 300, 60, 800, {isStatic: true});
  let rWall = Bodies.rectangle(1175, 300, 60, 800, {isStatic: true});
  /*let stack = Matter.Composites.stack(600,100,5,5,0,0, function(x,y) {
    return Bodies.rectangle(x,y, 40, 40);
  });*/
  let projectile = Bodies.circle(-200,400, 20, {
    restitution: 1,
    inertia: Infinity,
    friction: 0,
    frictionAir: 0,
    frictionStatic: 0
    
  });
  /*projectile.mass = kilos;
  projectile.inverseMass = 1/projectile.mass;*/
  let sling = Matter.Constraint.create({
    pointA: {x:-200, y:400},
    bodyB: projectile,
    stiffness: 0.05

  })
  
  Composite.allBodies.restitution = 1;

  // constraints
  let mouse = Matter.Mouse.create(render.canvas);
  let mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      render: {visible: false}
    }
  });
  render.mouse = mouse;

  let firing = false;
  Matter.Events.on(mouseConstraint, "enddrag", (e) => {
    if (e.body === projectile) firing = true;
  });
  Matter.Events.on(engine, "afterUpdate", () => {
    if (firing && Math.abs(projectile.position.x+200) < 20 && Math.abs(projectile.position.y-400) < 20) {
      projectile = Matter.Bodies.circle(-200, 400, 20, {
        restitution: 1,
        inertia: Infinity,
        friction: 0,
        frictionAir: 0,
        frictionStatic: 0
        
      });
      Matter.World.add(engine.world, projectile);
      sling.bodyB = projectile;
      firing = false;
      /*projectile.mass = kilos;
      projectile.inverseMass = 1/projectile.mass;*/
    }
  });

  let explosion = function(engine) {
    let bodies = Composite.allBodies(engine.world);

    for (let i = 0; i < bodies.length; i++) {
        let body = bodies[i];

        if (!body.isStatic && body.position.y == 500) {
            let forceMagnitude = 5000;

            Body.applyForce(body, body.position, {
                x: (forceMagnitude + Common.random() * forceMagnitude) * Common.choose([1, -1]), 
                y: -forceMagnitude + Common.random() * -forceMagnitude
            });
        }
    }
};


explosion(engine);

  // add all of the bodies to the world
  Composite.add(engine.world, [sling, projectile, ground, /*platform*/ ceil, lWall, rWall,  mouseConstraint, /*stack*/]);
  //engine.world.gravity.y = 0;

  // run the renderer
  Render.run(render);

  // create runner
  let runner = Runner.create();

  // run the engine
  Runner.run(runner, engine);
}

function update() {

}
// main
setup();

Render.lookAt(render, {
  min: { x: 0, y: 0 },
  max: { x: 800, y: 600 }
});



