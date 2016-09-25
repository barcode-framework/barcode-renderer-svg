"use strict";
(function() {
  var root = this
  var previous_SVGRenderer= root.SVGRenderer
  if( typeof exports !== 'undefined' ) {
    if( typeof module !== 'undefined' && module.exports ) {
      exports = module.exports = SVGRenderer
    }
    exports.SVGRenderer= SVGRenderer
  }
  else {
    root.SVGRenderer= SVGRenderer
  }
  SVGRenderer.noConflict = function() {
    root.SVGRenderer= previous_SVGRenderer
    return SVGRenderer
  }
}).call(this);

function SVGRenderer(){
  function round(x,p){
    return parseFloat(x.toFixed(p))
  }
  this.render = function(input,options){
    if(!options) options={}
    //width:300,height:200,baseline:30,withNumbers:true,quitezone:[10,10]
    options.width = options.width!=undefined  ? options.width : 300
    options.height = options.height!=undefined  ? options.height : 200
    options.baseline = options.baseline!=undefined  ? options.baseline : 30
    options.withNumbers = options.withNumbers!=undefined ? options.withNumbers : true
    options.quitezone = options.quitezone!=undefined  ? options.quitezone : [10,10]
    options.padding = options.padding!=undefined  ? options.padding : 0
    options.simpleText = options.simpleText!=undefined  ? options.simpleText : false
    options.class = options.class!=undefined ? options.class : ""
    options.precession = options.precession!=undefined ? options.precession : 2
    if(options.simpleText) options.withNumbers=false
    var tl=0
    for(let i=0;i<input.length;i++){
      tl+=input[i].bars.length
    }
    var scaleX = (options.width)/(tl+options.quitezone[0]+options.quitezone[1])
    var svg=`<svg class="${options.class}" xmlns="http://www.w3.org/2000/svg" width="${options.width}" height="${options.height}"><g >`
    var offset = options.quitezone[0]
    for(let j=0;j<input.length;j++){
      var startoffset=offset
      var bl = options.baseline
      var bl2=options.baseline/2
      var item = input[j]
      var first = item.bars[0]
      var st     = ``
      for(var i  = 0; i < item.weights.length; i++ ) {
        var w   = parseInt( item.weights[i] )
        if ( i%2 == first) {
        } else {

          if(item.role=="ctrl" && !options.simpleText) bl=bl2
          if(w>0) {
            st += `M ${round(offset*scaleX,options.precession)}, ${round(options.height-bl-options.padding,options.precession)} V ${options.padding} h ${round(w*scaleX,options.precession)} V ${round(options.height-bl-options.padding,options.precession)} z `
          }
        }
        offset += w
      }
      svg+=`<path fill="currentColor" d="${st}"/>\n`
      var pos = startoffset + (offset-startoffset)/2
      if(options.withNumbers){
          if(item.role!="ctrl") svg+=`<text fill="currentColor" text-anchor="middle" x="${round(pos*scaleX,options.precession)}" y="${round(options.height-options.baseline/4,options.precession)}" font-size="${round(bl*0.8,options.precession)}">${item.symbol}</text>`
      }

    }
    if(options.simpleText){
        svg+=`<text fill="currentColor"  text-anchor="middle" x="${round(options.width/2,options.precession)}" y="${round(options.height-options.baseline/4,options.precession)}" font-size="${round(bl*0.8,options.precession)}">${options.text}</text>`
    }
    svg+=`</g></svg>`
    return svg
  }
}
