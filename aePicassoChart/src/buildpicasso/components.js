import createDockedItem from './components/dockeditems.js'
import createLayer from './components/layers.js'
import createRefLines from './components/refLines.js'

//Create Components
var createComponents = function(picassoprops, hypercube, theme) {
  var componentsArray = [];
  //Axis
  picassoprops.componentsDef.axis.forEach((axis) => {
    componentsArray.push.apply(componentsArray, createDockedItem(axis, hypercube, picassoprops, theme));
  });

  //Layers
  var layersLen = picassoprops.componentsDef.layers.length;
  picassoprops.componentsDef.layers.forEach((layer, i) => {
    var retLayer = createLayer(layer);
    if (retLayer !== null){
      retLayer[0].displayOrder = i;
      componentsArray.push.apply(componentsArray, retLayer);
    }
  });

  //Ref Lines
  let refline = createRefLines(picassoprops.reflines, theme);
  if (refline !== null){
    //retLayer[0].displayOrder = i;
    componentsArray.push.apply(componentsArray, refline);
  }


  var brush = componentsArray.filter(x => x.type == 'brush-range');
  var notbrush = componentsArray.filter(x => x.type != 'brush-range');



  return notbrush.concat(brush);
};

export default createComponents;
