
import { InteractivityDetect, OutMode, MoveDirection } from 'react-tsparticles'

const particlesOptions = {
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 1657.2100474277727
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "polygon",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 12
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.24852886943415603,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 0.48724632738080703,
        "opacity_min": 0.04060386061506725,
        "sync": true
      }
    },
    "size": {
      "value": 7.891476416322726,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 112.2388442605866,
      "color": "#ffffff",
      "opacity": 0.6894671861721748,
      "width": 0.9620472365193136
    },
    "move": {
      "enable": true,
      "speed": 3.206824121731046,
      "direction": MoveDirection.none,
      "random": true,
      "straight": false,
      "out_mode": OutMode.bounce,
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 561.194221302933,
        "rotateY": 641.3648243462092
      }
    }
  },
  "interactivity": {
    "detect_on": InteractivityDetect.canvas,
    "events": {
      "onhover": {
        "enable": false,
        "mode": "grab"
      },
      "onclick": {
        "enable": false,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
}

export default particlesOptions