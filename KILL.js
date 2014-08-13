Positions = new Meteor.Collection("positions");

if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "A Metacupcake production";
  };

  // This damn box thing
  Template.hello.test = function() {
    //Session.surface
    //et("test", localStorage.getItem("test"));

    require("famous-polyfills"); // Add polyfills
    require("famous/core/famous"); // Add the default css file


    var Engine = require("famous/core/Engine");
    var Surface = require("famous/core/Surface");
    var Transform = require("famous/core/Transform"); // Add transform
    var StateModifier = require("famous/modifiers/StateModifier"); // Add modifiers
    var Draggable = require("famous/modifiers/Draggable"); // Add's the built in draggable method
    var Transitionable = require("famous/transitions/Transitionable");

    var SnapTransition = require("famous/transitions/SnapTransition");
    Transitionable.registerMethod('snap', SnapTransition);

    var mainContext = Engine.createContext();

    var surface = new Surface({ 
        content: "A",
        size: [100, 100],
        properties: {
            lineHeight: "100px",
            textAlign: "center", 
            backgroundColor: 'orange',
            cursor: 'pointer'
        } 
    });

    var draggable = new Draggable({
      xRange: [-220, 220],
      yRange: [-220, 220]
    });

    surface.pipe(draggable);

    var mod = new StateModifier( {
      transform: Transform.translate(150, 100, 0)
    });

    var trans = {
      method: 'snap',
      period: 300,
      dampingRatio: 0.3,
      velocity: 0
    };

    surface.on('mouseup', function() {
      //draggable.setPosition([0,0,0], trans);
      console.log(draggable.getPosition());

      var pos = draggable.getPosition();
      Positions.update(Session.get('Coords'), {$set: {pos:pos}});
    });

    mainContext.add(mod).add(draggable).add(surface);
  };
};

// Start the serve code here 8=D
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
