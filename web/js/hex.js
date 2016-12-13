// Hexagone class
// Used threejs Vector3 as a model: https://github.com/mrdoob/three.js/blob/master/src/math/Vector3.js

function Hex(q, r) {
    this.q = q || 0;
    this.r = r || 0;
}

Hex.prototype = {
    contructor: Hex,

    fromString: function(str) {
        var d = JSON.parse(str);
        this.q = d.q;
        this.r = d.r;
    },

    toString: function() {
        return JSON.stringify(this, [
            'q',
            'r'
        ]);
    },

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
