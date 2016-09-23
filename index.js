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
  this.render = function(input,options){
    if(!options) options={width:300,height:200,baseline:30,withNumbers:true}
    var tl=0
    for(let i=0;i<input.length;i++){
      tl+=input[i].bars.length
    }
    var scaleX = (options.width)/(tl+10)
    var svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${options.width}" height="${options.height}"><g >`
    var offset = 10
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

          if(item.role=="ctrl") bl=bl2
          if(w>0) {
            st += `M ${offset*scaleX}, ${options.height-bl} V ${0} h ${w*scaleX} V ${options.height-bl} z `
          }
        }
        offset += w
      }
      svg+=`<path d="${st}"/>\n`
      var pos = startoffset + (offset-startoffset)/2
      if(options.withNumbers){
          if(item.role!="ctrl") svg+=`<text text-anchor="middle" x="${pos*scaleX}" y="${options.height}" font-size="${bl}">${item.symbol}</text>`
      }
    }
    svg+=`</g></svg>`
    return svg
  }
}
