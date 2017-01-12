// Hexagone class
// Used threejs Vector3 as a model: https://github.com/mrdoob/three.js/blob/master/src/math/Vector3.js

// TODO, refactor to extend from three mesh

function Hex(q, r, ref) {
    this.q = q;
    this.r = r;
    this.ref = ref;
}

Hex.prototype = {
    contructor: Hex,

    set: function(q, r) {
        this.q = q;
        this.r = r;
        return this;
    },

    getQ: function() {
        return this.q;
    },

    getR: function() {
        return this.r;
    },

    getS: function() {
        return - this.q - this.r;
    },

    toPixel: function() {
        return {
            x: 1 * Math.sqrt(3) * (this.q + this.r/2),
            y: 1 * 3/2 * this.r,
        };
    },

    distanceFrom: function(h) {
        return Math.abs( this.getQ() - h.getQ() ) + Math.abs( this.getR() - h.getR() ) + Math.abs( this.getS() - h.getS() ) / 2;
    }
}
