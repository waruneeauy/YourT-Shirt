function getActiveStyle(styleName, object) {
  object = object || canvas.getActiveObject();
  if (!object) return '';

  return (object.getSelectionStyles && object.isEditing)
    ? (object.getSelectionStyles()[styleName] || '')
    : (object[styleName] || '');
};

function setActiveStyle(styleName, value, object) {
  object = object || canvas.getActiveObject();
  if (!object) return;

  if (object.setSelectionStyles && object.isEditing) {
    var style = { };
    style[styleName] = value;
    object.setSelectionStyles(style);
    object.setCoords();
  }
  else {
    object[styleName] = value;
  }

  object.setCoords();
  canvas.renderAll();
};

function getActiveProp(name) {
  var object = canvas.getActiveObject();
  if (!object) return '';

  return object[name] || '';
}

function setActiveProp(name, value) {
  var object = canvas.getActiveObject();
  if (!object) return;

  object.set(name, value).setCoords();
  canvas.renderAll();
}

function addAccessors($scope) {

  

  $scope.getOpacity = function() {
    return getActiveStyle('opacity') * 100;
  };
  $scope.setOpacity = function(value) {
    setActiveStyle('opacity', parseInt(value, 10) / 100);
  };

  $scope.getFill = function() {
    return getActiveStyle('fill');
  };
  $scope.setFill = function(value) {
    setActiveStyle('fill', value);
  };

  $scope.isBold = function() {
    return getActiveStyle('fontWeight') === 'bold';
  };
  $scope.toggleBold = function() {
    setActiveStyle('fontWeight',
      getActiveStyle('fontWeight') === 'bold' ? '' : 'bold');
  };
  $scope.isItalic = function() {
    return getActiveStyle('fontStyle') === 'italic';
  };
  $scope.toggleItalic = function() {
    setActiveStyle('fontStyle',
      getActiveStyle('fontStyle') === 'italic' ? '' : 'italic');
  };

  $scope.isUnderline = function() {
    return getActiveStyle('textDecoration').indexOf('underline') > -1;
  };
  $scope.toggleUnderline = function() {
    var value = $scope.isUnderline()
      ? getActiveStyle('textDecoration').replace('underline', '')
      : (getActiveStyle('textDecoration') + ' underline');

    setActiveStyle('textDecoration', value);
  };

  $scope.isLinethrough = function() {
    return getActiveStyle('textDecoration').indexOf('line-through') > -1;
  };
  $scope.toggleLinethrough = function() {
    var value = $scope.isLinethrough()
      ? getActiveStyle('textDecoration').replace('line-through', '')
      : (getActiveStyle('textDecoration') + ' line-through');

    setActiveStyle('textDecoration', value);
  };
  $scope.isOverline = function() {
    return getActiveStyle('textDecoration').indexOf('overline') > -1;
  };
  $scope.toggleOverline = function() {
    var value = $scope.isOverline()
      ? getActiveStyle('textDecoration').replace('overlin', '')
      : (getActiveStyle('textDecoration') + ' overline');

    setActiveStyle('textDecoration', value);
  };

  $scope.getText = function() {
    return getActiveProp('text');
  };
  $scope.setText = function(value) {
    setActiveProp('text', value);
  };

  $scope.getTextAlign = function() {
    return capitalize(getActiveProp('textAlign'));
  };
  $scope.setTextAlign = function(value) {
    setActiveProp('textAlign', value.toLowerCase());
  };

  $scope.getFontFamily = function() {
    return getActiveProp('fontFamily').toLowerCase();
  };
  $scope.setFontFamily = function(value) {
    setActiveProp('fontFamily', value.toLowerCase());
  };

  $scope.getBgColor = function() {
    return getActiveProp('backgroundColor');
  };
  $scope.setBgColor = function(value) {
    setActiveProp('backgroundColor', value);
  };

  $scope.getTextBgColor = function() {
    return getActiveProp('textBackgroundColor');
  };
  $scope.setTextBgColor = function(value) {
    setActiveProp('textBackgroundColor', value);
  };

  $scope.getStrokeColor = function() {
    return getActiveStyle('stroke');
  };
  $scope.setStrokeColor = function(value) {
    setActiveStyle('stroke', value);
  };

  $scope.getStrokeWidth = function() {
    return getActiveStyle('strokeWidth');
  };
  $scope.setStrokeWidth = function(value) {
    setActiveStyle('strokeWidth', parseInt(value, 10));
  };

  $scope.getFontSize = function() {
    return getActiveStyle('fontSize');
  };
  $scope.setFontSize = function(value) {
    setActiveStyle('fontSize', parseInt(value, 10));
  };

  $scope.getLineHeight = function() {
    return getActiveStyle('lineHeight');
  };
  $scope.setLineHeight = function(value) {
    setActiveStyle('lineHeight', parseFloat(value, 10));
  };

  $scope.getBold = function() {
    return getActiveStyle('fontWeight');
  };
  $scope.setBold = function(value) {
    setActiveStyle('fontWeight', value ? 'bold' : '');
  };

  $scope.getCanvasBgColor = function() {
    return canvas.backgroundColor;
  };
  $scope.setCanvasBgColor = function(value) {
    canvas.backgroundColor = value;
    canvas.renderAll();
  };

  $scope.addRect = function() {
    var coord = getRandomLeftTop();

    canvas.add(new fabric.Rect({
      left: coord.left,
      top: coord.top,
      fill: '#' + getRandomColor(),
      width: 50,
      height: 50,
      opacity: 0.8
    }));
  };

  $scope.addCircle = function() {
    var coord = getRandomLeftTop();

    canvas.add(new fabric.Circle({
      left: coord.left,
      top: coord.top,
      fill: '#' + getRandomColor(),
      radius: 50,
      opacity: 0.8
    }));
  };

  $scope.addTriangle = function() {
    var coord = getRandomLeftTop();

    canvas.add(new fabric.Triangle({
      left: coord.left,
      top: coord.top,
      fill: '#' + getRandomColor(),
      width: 50,
      height: 50,
      opacity: 0.8
    }));
  };

  $scope.addLine = function() {
    var coord = getRandomLeftTop();

    canvas.add(new fabric.Line([ 50, 100, 200, 200], {
      left: coord.left,
      top: coord.top,
      stroke: '#' + getRandomColor()
    }));
  };

  $scope.addPolygon = function() {
    var coord = getRandomLeftTop();

    this.canvas.add(new fabric.Polygon([
      {x: 185, y: 0},
      {x: 250, y: 100},
      {x: 385, y: 170},
      {x: 0, y: 245} ], {
        left: coord.left,
        top: coord.top,
        fill: '#' + getRandomColor()
      }));
  };

  $scope.maybeLoadShape = function(e) {
    var $el = $(e.target).closest('button.shape');
    if (!$el[0]) return;

    var id = $el.prop('id'), match;
    if (match = /\d+$/.exec(id)) {
      addShape(match[0]);
    }
  };

  function addImage(imageName, minScale, maxScale) {
      var coord = getRandomLeftTop();

      

      //fabric.Image.fromURL('../collection/' + imageName, function(image) {
        fabric.Image.fromURL(imageName, function (image) {
/*
      image.set({
        left: coord.left,
        top: coord.top,
        //angle: getRandomInt(-10, 10)
      })
      .scale(getRandomNum(minScale, maxScale))
      .setCoords();
*/
      canvas.add(image);
    });
  };

  $scope.addImage1 = function() {
    addImage('1.png', 0.8, 0.8);
  };

  $scope.addImage2 = function() {
    addImage('2.png', 0.8, 0.8);
  };

  $scope.addImage3 = function() {
    addImage('3.png', 0.8, 0.8);
  };

  $scope.addImage4 = function() {
    addImage('4.png', 0.8, 0.8);
  };

  $scope.addImage5 = function() {
    addImage('5.png', 0.5, 0.8);
  };

  $scope.addImage6 = function() {
    addImage('6.png', 0.8, 0.8);
  };

  $scope.addImage7 = function() {
    addImage('7.png', 0.8, 0.8);
  };

  $scope.addImage8 = function() {
    addImage('8.png', 0.8, 0.8);
  };


  $scope.confirmClear = function() {
    if (confirm('Are you sure clear design?')) {
      canvas.clear();
    }
  };

  $scope.rasterize = function() {
    if (!fabric.Canvas.supports('toDataURL')) {
      alert('This browser doesn\'t provide means to serialize canvas to an image');
    }
    else {
      window.open(canvas.toDataURL('png'));
    }
  };

  $scope.rasterizeJSON = function() {
    alert(JSON.stringify(canvas));
  };

  $scope.getSelected = function() {
    return canvas.getActiveObject();
  };

  $scope.removeSelected = function() {
    var activeObject = canvas.getActiveObject(),
        activeGroup = canvas.getActiveGroup();

    if (activeGroup) {
      var objectsInGroup = activeGroup.getObjects();
      canvas.discardActiveGroup();
      objectsInGroup.forEach(function(object) {
        canvas.remove(object);
      });
    }
    else if (activeObject) {
      canvas.remove(activeObject);
    }
  };

  $scope.getHorizontalLock = function() {
    return getActiveProp('lockMovementX');
  };
  $scope.setHorizontalLock = function(value) {
    setActiveProp('lockMovementX', value);
  };

  $scope.getVerticalLock = function() {
    return getActiveProp('lockMovementY');
  };
  $scope.setVerticalLock = function(value) {
    setActiveProp('lockMovementY', value);
  };

  $scope.getScaleLockX = function() {
    return getActiveProp('lockScalingX');
  },
  $scope.setScaleLockX = function(value) {
    setActiveProp('lockScalingX', value);
  };

  $scope.getScaleLockY = function() {
    return getActiveProp('lockScalingY');
  };
  $scope.setScaleLockY = function(value) {
    setActiveProp('lockScalingY', value);
  };

  $scope.getRotationLock = function() {
    return getActiveProp('lockRotation');
  };
  $scope.setRotationLock = function(value) {
    setActiveProp('lockRotation', value);
  };

  $scope.getOriginX = function() {
    return getActiveProp('originX');
  };
  $scope.setOriginX = function(value) {
    setActiveProp('originX', value);
  };

  $scope.getOriginY = function() {
    return getActiveProp('originY');
  };
  $scope.setOriginY = function(value) {
    setActiveProp('originY', value);
  };

  $scope.sendBackwards = function() {
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.sendBackwards(activeObject);
    }
  };

  $scope.sendToBack = function() {
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.sendToBack(activeObject);
    }
  };

  $scope.bringForward = function() {
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.bringForward(activeObject);
    }
  };

  $scope.bringToFront = function() {
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.bringToFront(activeObject);
    }
  };

  var pattern = new fabric.Pattern({
    source: '/assets/escheresque.png',
    repeat: 'repeat'
  });

  $scope.patternify = function() {
    var obj = canvas.getActiveObject();

    if (!obj) return;

    if (obj.fill instanceof fabric.Pattern) {
      obj.fill = null;
    }
    else {
      if (obj instanceof fabric.PathGroup) {
        obj.getObjects().forEach(function(o) { o.fill = pattern; });
      }
      else {
        obj.fill = pattern;
      }
    }
    canvas.renderAll();
  };

  $scope.clip = function() {
    var obj = canvas.getActiveObject();
    if (!obj) return;

    if (obj.clipTo) {
      obj.clipTo = null;
    }
    else {
      var radius = obj.width < obj.height ? (obj.width / 2) : (obj.height / 2);
      obj.clipTo = function (ctx) {
        ctx.arc(0, 0, radius, 0, Math.PI * 2, true);
      };
    }
    canvas.renderAll();
  };

  $scope.shadowify = function() {
    var obj = canvas.getActiveObject();
    if (!obj) return;

    if (obj.shadow) {
      obj.shadow = null;
    }
    else {
      obj.setShadow({
        color: 'rgba(0,0,0,0.3)',
        blur: 10,
        offsetX: 10,
        offsetY: 10
      });
    }
    canvas.renderAll();
  };

  $scope.gradientify = function() {
    var obj = canvas.getActiveObject();
    if (!obj) return;

    obj.setGradient('fill', {
      x1: 0,
      y1: 0,
      x2: (getRandomInt(0, 1) ? 0 : obj.width),
      y2: (getRandomInt(0, 1) ? 0 : obj.height),
      colorStops: {
        0: '#' + getRandomColor(),
        1: '#' + getRandomColor()
      }
    });
    canvas.renderAll();
  };

  $scope.execute = function() {
    if (!(/^\s+$/).test(consoleValue)) {
      eval(consoleValue);
    }
  };

  var consoleSVGValue = (
    '<?xml version="1.0" standalone="no"?>' +
      '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">' +
    '<svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">' +
      '<rect width="300" height="100" style="fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0)"/>' +
    '</svg>'
  );

  var consoleValue = (
    '// clear canvas\n' +
    'canvas.clear();\n\n' +
    '// remove currently selected object\n' +
    'canvas.remove(canvas.getActiveObject());\n\n' +
    '// add red rectangle\n' +
    'canvas.add(new fabric.Rect({\n' +
    '  width: 50,\n' +
    '  height: 50,\n' +
    '  left: 50,\n' +
    '  top: 50,\n' +
    "  fill: 'rgb(255,0,0)'\n" +
    '}));\n\n' +
    '// add green, half-transparent circle\n' +
    'canvas.add(new fabric.Circle({\n' +
    '  radius: 40,\n' +
    '  left: 50,\n' +
    '  top: 50,\n' +
    "  fill: 'rgb(0,255,0)',\n" +
    '  opacity: 0.5\n' +
    '}));\n'
  );

  $scope.getConsoleSVG = function() {
    return consoleSVGValue;
  };
  $scope.setConsoleSVG = function(value) {
    consoleSVGValue = value;
  };
  $scope.getConsole = function() {
    return consoleValue;
  };
  $scope.setConsole = function(value) {
    consoleValue = value;
  };

  $scope.loadSVGWithoutGrouping = function() {
    _loadSVGWithoutGrouping(consoleSVGValue);
  };
  $scope.loadSVG = function() {
    _loadSVG(consoleSVGValue);
  };

  var _loadSVG = function(svg) {
    fabric.loadSVGFromString(svg, function(objects, options) {
      var obj = fabric.util.groupSVGElements(objects, options);
      canvas.add(obj).centerObject(obj).renderAll();
      obj.setCoords();
    });
  };

  var _loadSVGWithoutGrouping = function(svg) {
    fabric.loadSVGFromString(svg, function(objects) {
      canvas.add.apply(canvas, objects);
      canvas.renderAll();
    });
  };

  function initCustomization() {
    if (typeof Cufon !== 'undefined' && Cufon.fonts.delicious) {
      Cufon.fonts.delicious.offsetLeft = 75;
      Cufon.fonts.delicious.offsetTop = 25;
    }

    if (/(iPhone|iPod|iPad)/i.test(navigator.userAgent)) {
      fabric.Object.prototype.cornerSize = 30;
    }

    fabric.Object.prototype.transparentCorners = false;

    if (document.location.search.indexOf('guidelines') > -1) {
      initCenteringGuidelines(canvas);
      initAligningGuidelines(canvas);
    }
  }

  initCustomization();

  $scope.getFreeDrawingMode = function() {
    return canvas.isDrawingMode;
  };
  $scope.setFreeDrawingMode = function(value) {
    canvas.isDrawingMode = !!value;
    $scope.$$phase || $scope.$digest();
  };

  $scope.freeDrawingMode = 'Pencil';

  $scope.getDrawingMode = function() {
    return $scope.freeDrawingMode;
  };
  $scope.setDrawingMode = function(type) {
    $scope.freeDrawingMode = type;

    if (type === 'hline') {
      canvas.freeDrawingBrush = $scope.vLinePatternBrush;
    }
    else if (type === 'vline') {
      canvas.freeDrawingBrush = $scope.hLinePatternBrush;
    }
    else if (type === 'square') {
      canvas.freeDrawingBrush = $scope.squarePatternBrush;
    }
    else if (type === 'diamond') {
      canvas.freeDrawingBrush = $scope.diamondPatternBrush;
    }
    else if (type === 'texture') {
      canvas.freeDrawingBrush = $scope.texturePatternBrush;
    }
    else {
      canvas.freeDrawingBrush = new fabric[type + 'Brush'](canvas);
    }

    $scope.$$phase || $scope.$digest();
  };

  $scope.getDrawingLineWidth = function() {
    if (canvas.freeDrawingBrush) {
      return canvas.freeDrawingBrush.width;
    }
  };
  $scope.setDrawingLineWidth = function(value) {
    if (canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.width = parseInt(value, 10) || 1;
    }
  };

  $scope.getDrawingLineColor = function() {
    if (canvas.freeDrawingBrush) {
      return canvas.freeDrawingBrush.color;
    }
  };
  $scope.setDrawingLineColor = function(value) {
    if (canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.color = value;
    }
  };

  $scope.getDrawingLineShadowWidth = function() {
    if (canvas.freeDrawingBrush && canvas.freeDrawingBrush.shadow) {
      return canvas.freeDrawingBrush.shadow.blur || 1;
    }
    else {
      return 0
    }
  };
  $scope.setDrawingLineShadowWidth = function(value) {
    if (canvas.freeDrawingBrush) {
      var blur = parseInt(value, 10) || 1;
      if (blur > 0) {
        canvas.freeDrawingBrush.shadow = new fabric.Shadow({blur: blur, offsetX: 10, offsetY: 10}) ;
      }
      else {
        canvas.freeDrawingBrush.shadow = null;
      }
    }
  };

  function initBrushes() {
    if (!fabric.PatternBrush) return;

    initVLinePatternBrush();
    initHLinePatternBrush();
    initSquarePatternBrush();
    initDiamondPatternBrush();
    initImagePatternBrush();
  }
  initBrushes();

  function initImagePatternBrush() {
    var img = new Image();
    img.src = '../assets/honey_im_subtle.png';

    $scope.texturePatternBrush = new fabric.PatternBrush(canvas);
    $scope.texturePatternBrush.source = img;
  }

  function initDiamondPatternBrush() {
    $scope.diamondPatternBrush = new fabric.PatternBrush(canvas);
    $scope.diamondPatternBrush.getPatternSrc = function() {

      var squareWidth = 10, squareDistance = 5;
      var patternCanvas = fabric.document.createElement('canvas');
      var rect = new fabric.Rect({
        width: squareWidth,
        height: squareWidth,
        angle: 45,
        fill: this.color
      });

      var canvasWidth = rect.getBoundingRectWidth();

      patternCanvas.width = patternCanvas.height = canvasWidth + squareDistance;
      rect.set({ left: canvasWidth / 2, top: canvasWidth / 2 });

      var ctx = patternCanvas.getContext('2d');
      rect.render(ctx);

      return patternCanvas;
    };
  }

  function initSquarePatternBrush() {
    $scope.squarePatternBrush = new fabric.PatternBrush(canvas);
    $scope.squarePatternBrush.getPatternSrc = function() {

      var squareWidth = 10, squareDistance = 2;

      var patternCanvas = fabric.document.createElement('canvas');
      patternCanvas.width = patternCanvas.height = squareWidth + squareDistance;
      var ctx = patternCanvas.getContext('2d');

      ctx.fillStyle = this.color;
      ctx.fillRect(0, 0, squareWidth, squareWidth);

      return patternCanvas;
    };
  }

  function initVLinePatternBrush() {
    $scope.vLinePatternBrush = new fabric.PatternBrush(canvas);
    $scope.vLinePatternBrush.getPatternSrc = function() {

      var patternCanvas = fabric.document.createElement('canvas');
      patternCanvas.width = patternCanvas.height = 10;
      var ctx = patternCanvas.getContext('2d');

      ctx.strokeStyle = this.color;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(0, 5);
      ctx.lineTo(10, 5);
      ctx.closePath();
      ctx.stroke();

      return patternCanvas;
    };
  }

  function initHLinePatternBrush() {
    $scope.hLinePatternBrush = new fabric.PatternBrush(canvas);
    $scope.hLinePatternBrush.getPatternSrc = function() {

      var patternCanvas = fabric.document.createElement('canvas');
      patternCanvas.width = patternCanvas.height = 10;
      var ctx = patternCanvas.getContext('2d');

      ctx.strokeStyle = this.color;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(5, 0);
      ctx.lineTo(5, 10);
      ctx.closePath();
      ctx.stroke();

      return patternCanvas;
    };
  }
}

function watchCanvas($scope) {

  function updateScope() {
    $scope.$$phase || $scope.$digest();
    canvas.renderAll();
  }

  canvas
    .on('object:selected', updateScope)
    .on('group:selected', updateScope)
    .on('path:created', updateScope)
    .on('selection:cleared', updateScope);
}

kitchensink.controller('CanvasControls', function($scope,$http) {

  $scope.canvas = canvas;
  //$scope.getActiveStyle = getActiveStyle;

  addAccessors($scope);
  watchCanvas($scope);

  var CanvasControls = this;


  //function of save button
  this.saveCanvas = function () {

      alert('save button work!');

      //Logging to test result
      console.log(canvas);
      console.log(JSON.stringify(canvas));
      console.log('toSVG!!!  ' + canvas.toSVG());
      console.log('toOBJECT!!!  ' +canvas.toObject());
      console.log('toJSON!!! ' + canvas.toJSON());
      //console.log('toDataURL PNG!!!' + canvas.toDataURL('png'));

      var svgCanvas = canvas.toSVG(); //store converted canvas to var
      var JSONCanvas = canvas.toJSON();

      $http({
          method: 'POST',
          url: 'https://api.parse.com/1/files/testImage.svg', //file is require to be upload individually first before add to object
          headers: {
              'X-Parse-Application-Id': 'WhAmgtyQMIGrpkP6ITS0J7Wh72HHUAFMTESWzEdf',
              'X-Parse-REST-API-Key': 'jgDUgvH8nCN5ci3mH9grLU4P89JRWBGSAyJY30Nq',
              'Content-Type': 'image/svg' // indicate the type of image
          },
          
          data: svgCanvas 


      }).success(function (data, status) {

          
          console.log(status + " " + JSON.stringify(data));
          console.log(data.name);

          $http({ //after upload file success, associate with the object.
              method: 'POST',
              url: 'https://api.parse.com/1/classes/ShirtDesign',
              headers: {
                  'X-Parse-Application-Id': 'WhAmgtyQMIGrpkP6ITS0J7Wh72HHUAFMTESWzEdf',
                  'X-Parse-REST-API-Key': 'jgDUgvH8nCN5ci3mH9grLU4P89JRWBGSAyJY30Nq',
                  'Content-Type': 'application/json'
              },

              data: {

                  'testString' : 'HelloWorld!',
                  'testSVG': {
                      '__type': "File",
                      'name': data.name
                  },
                  'testJSON': JSONCanvas
              }


          }).success(function (data, status) {

              
              alert(status);
       

          }).error(function (data, status) {
              
          });

      }).error(function (data, status) {
          alert('save failed');
      });

  }
});


//CONTROLLER TO CONTROL COLLECTION PART
kitchensink.controller('CollectionController', ['$http','$scope', function ($http,$scope) { 


    var selectedClass = "DesignCollections"; //Class that is selected to called from parse.

    //init search collection
    this.searchText = "";
    this.searchSelection = "All";
    
    //for testing angular view only, just to save time...
    this.test1 = "So!";
    this.test2 = "Shop!";

    //init property
    var CollectionController = this;
    CollectionController.collectionDataArray = [];
    CollectionController.collectionDetailArray = [];
    CollectionController.isShowDetail = false; //condition to hide or show collection and detail div
    CollectionController.detailedCollectionName = "";
    CollectionController.selectedCollectionDesigner = "";
    CollectionController.moreDesignArray = [];
    CollectionController.searchResultText = "";
    $scope.shirtDesignArray = [];

    //START: init first search [TEMP], because cannot just called function startSearch()
    if (this.searchSelection.toLowerCase() == 'all') { //if selection is all, show all by ignore selection input
        console.log('selection is all');
        $http({
            method: 'GET',
            url: 'https://api.parse.com/1/classes/' + selectedClass,
            headers: {
                'X-Parse-Application-Id': 'WhAmgtyQMIGrpkP6ITS0J7Wh72HHUAFMTESWzEdf',
                'X-Parse-REST-API-Key': 'jgDUgvH8nCN5ci3mH9grLU4P89JRWBGSAyJY30Nq'
            },

            params: {

                'where': {
                    "fixedSearchIndex": { "$regex": this.searchText.toLowerCase() },
                }

            }

        }).success(function (data, status) {

            querySuccess(data, status, this.searchText);

        }).error(function (data, status) {
            queryFailed();
        });
    }
    else { //if selection is not 'all', use selection input in to contraint query as well.
        console.log('selection is not all');
        $http({
            method: 'GET',
            url: 'https://api.parse.com/1/classes/' + selectedClass,
            headers: {
                'X-Parse-Application-Id': 'WhAmgtyQMIGrpkP6ITS0J7Wh72HHUAFMTESWzEdf',
                'X-Parse-REST-API-Key': 'jgDUgvH8nCN5ci3mH9grLU4P89JRWBGSAyJY30Nq'
            },

            params: {

                'where': {
                    "fixedSearchIndex": { "$regex": this.searchText.toLowerCase() },
                    //and
                    "variedSearchIndex": this.searchSelection.toLowerCase()
                }

            }

        }).success(function (data, status) {

            querySuccess(data, status, text);

        }).error(function (data, status) {
            queryFailed();
        });

    };
    //END: init first search [TEMP]

    //START: query for all shirt designed.
    $http({
        method: 'GET',
        url: 'https://api.parse.com/1/classes/ShirtDesign',
        headers: {
            'X-Parse-Application-Id': 'WhAmgtyQMIGrpkP6ITS0J7Wh72HHUAFMTESWzEdf',
            'X-Parse-REST-API-Key': 'jgDUgvH8nCN5ci3mH9grLU4P89JRWBGSAyJY30Nq'
        },

        params: {
         

        }

    }).success(function (data, status) {
        console.log(data.results);
        alert('Shirt Design Loaded!')
        $scope.shirtDesignArray = data.results;
        

    }).error(function (data, status) {
        alert('ShirtDesign query failed! '+ status)
    });
    //END: query for all shirt designed.

    //Seach function when a search button is clicked.
    this.startSearch = function () { 
        console.log("Search start! with " + this.searchText + this.searchSelection);
        collectionSearch(this.searchText, this.searchSelection);
        CollectionController.isShowDetail = false;

    }


    //function to search collection.
    var collectionSearch = function (text,selection) {

        var loweredText = text.toLowerCase();
        var loweredSelection = selection.toLowerCase();

        console.log(loweredText);
        console.log(loweredSelection);

        if (loweredSelection == 'all') { //if selection is all, show all by ignore selection input
            console.log('selection is all');
            $http({
                method: 'GET',
                url: 'https://api.parse.com/1/classes/' + selectedClass,
                headers: {
                    'X-Parse-Application-Id': 'WhAmgtyQMIGrpkP6ITS0J7Wh72HHUAFMTESWzEdf',
                    'X-Parse-REST-API-Key': 'jgDUgvH8nCN5ci3mH9grLU4P89JRWBGSAyJY30Nq'
                },

                params: {

                    'where': {
                        "fixedSearchIndex": { "$regex": loweredText },
                    }

                }

            }).success(function (data, status) {

                querySuccess(data, status, text);

            }).error(function (data, status) {
                queryFailed();
            });
        }
        else { //if selection is not 'all', use selection input in to contraint query as well.
            console.log('selection is not all, it is ' + loweredSelection);
            $http({
                method: 'GET',
                url: 'https://api.parse.com/1/classes/' + selectedClass,
                headers: {
                    'X-Parse-Application-Id': 'WhAmgtyQMIGrpkP6ITS0J7Wh72HHUAFMTESWzEdf',
                    'X-Parse-REST-API-Key': 'jgDUgvH8nCN5ci3mH9grLU4P89JRWBGSAyJY30Nq'
                },

                params: {

                    'where': {
                        "fixedSearchIndex": { "$regex": loweredText },
                        //and
                        "variedSearchIndex": loweredSelection
                    }

                }

            }).success(function (data, status) {

                querySuccess(data, status, text);

            }).error(function (data, status) {
                queryFailed();
            });
        
        };


    }

    var querySuccess = function (data,status,text) {
        CollectionController.collectionDataArray = data.results;
        console.log(CollectionController.collectionDataArray);

        console.log("data loaded with" + data.results.length);

        //if succes but no result found show 'result not found'
        if (CollectionController.collectionDataArray.length == 0) {
            CollectionController.searchResultText = text;
        }
    }

    var queryFailed = function (data,status) {
        alert("data failed");
    }

    //function when collection is clicked!
    this.showDetail = function (collection) {
        CollectionController.isShowDetail = true;
        CollectionController.detailedCollectionName = collection.collectionName;
        CollectionController.selectedCollectionDesigner = collection.designerName;
        console.log(collection.createdBy.objectId);
        console.log(collection.collectionName + " is clicked!")


        showSelectedCollection(collection.objectId);
        showMoreDesign(collection.objectId, collection.createdBy.objectId);

    }

    //back just by changing state and link with ng-hide/show
    this.backToList = function () {
        CollectionController.isShowDetail = false;
    }

    //fucntion after collection is clicked.
    var showSelectedCollection = function (collectionId) {

        $http({
            method: 'GET',
            url: 'https://api.parse.com/1/classes/' + 'DesignData',
            headers: {
                'X-Parse-Application-Id': 'WhAmgtyQMIGrpkP6ITS0J7Wh72HHUAFMTESWzEdf',
                'X-Parse-REST-API-Key': 'jgDUgvH8nCN5ci3mH9grLU4P89JRWBGSAyJY30Nq'
            },
            params: {

                'where': {
                    "inCollection": {
                        "__type": "Pointer", //for pointer column
                        "className": "DesignCollections",
                        "objectId": collectionId
                    }
                }
                
            }

        }).success(function (data, status) {


            CollectionController.collectionDetailArray = data.results;
            console.log(CollectionController.collectionDetailArray);



        }).error(function (data, status) {
            alert("failed");
        });
    }

    //function to load already design work to current canvas
    this.loadToCanvas = function (shirtDesign) {
        console.log(shirtDesign);
        console.log(shirtDesign.testJSON);

        

       // canvas.loadFromJSON(shirtDesign.testJSON); // load using JSON
        fabric.loadSVGFromURL( '../testsvg/test1.svg', function (objects, options) {
            console.log(objects);
            var obj = fabric.util.groupSVGElements(objects, options);
            canvas.add(obj).renderall;
            
            //for (i = 0 ; i<objects.length ; i++ ){
            //    canvas.add(objects[i]);
               
            //}
            
        });

        
       


    }

    //function to query more deisng by designer, but not in selected collection, when the collection is clicked.
    var showMoreDesign = function (collectionId, designerId) {
        $http({
            method: 'GET',
            url: 'https://api.parse.com/1/classes/' + 'DesignData',
            headers: {
                'X-Parse-Application-Id': 'WhAmgtyQMIGrpkP6ITS0J7Wh72HHUAFMTESWzEdf',
                'X-Parse-REST-API-Key': 'jgDUgvH8nCN5ci3mH9grLU4P89JRWBGSAyJY30Nq'
            },
            params: {
                //all design by Designer but not in collection, sort by collection name
                //'where': { "byDesigner": { "__type": "Pointer", "className": "_User", "objectId": designerId } }
                'where': {
                    "byDesigner": { "__type": "Pointer", "className": "_User", "objectId": designerId }, //all design by designer
                    //AND
                    "inCollection": { "$nin": [{ "__type": "Pointer", "className": "DesignCollections", "objectId": collectionId }] } // every other design that not in the colelction
                },
                'order': '-createdAt'
            }

        }).success(function (data, status) {

            CollectionController.moreDesignArray = data.results;
            console.log(CollectionController.moreDesignArray);

        }).error(function (data, status) {
            alert("failed");
        });

        
    }

    //function to add image to canvas, with ng-click
    this.addImageFromCollection = function (design) {

        console.log(design.imageFile.url);
        imageUrl = design.imageFile.url;

        fabric.Image.fromURL(imageUrl, function (image) {

            canvas.add(image);
        });

        
    }

    
}]);


  function addTexts(txt) {
    /*var iText = new fabric.IText('lorem ipsum\ndolor\nsit Amet\nconsectetur', {
      left: 100,
      top: 150,
      fontFamily: 'Helvetica',
      fill: '#333',
      styles: {
        0: {
          0: { fill: 'red', fontSize: 20 },
          1: { fill: 'red', fontSize: 30 },
          2: { fill: 'red', fontSize: 40 },
          3: { fill: 'red', fontSize: 50 },
          4: { fill: 'red', fontSize: 60 },

          6: { textBackgroundColor: 'yellow' },
          7: { textBackgroundColor: 'yellow' },
          8: { textBackgroundColor: 'yellow' },
          9: { textBackgroundColor: 'yellow' }
        },
        1: {
          0: { textDecoration: 'underline' },
          1: { textDecoration: 'underline' },
          2: { fill: 'green', fontStyle: 'italic', textDecoration: 'underline' },
          3: { fill: 'green', fontStyle: 'italic', textDecoration: 'underline' },
          4: { fill: 'green', fontStyle: 'italic', textDecoration: 'underline' }
        },
        2: {
          0: { fill: 'blue', fontWeight: 'bold' },
          1: { fill: 'blue', fontWeight: 'bold' },
          2: { fill: 'blue', fontWeight: 'bold' },

          4: { fontFamily: 'Courier', textDecoration: 'line-through' },
          5: { fontFamily: 'Courier', textDecoration: 'line-through' },
          6: { fontFamily: 'Courier', textDecoration: 'line-through' },
          7: { fontFamily: 'Courier', textDecoration: 'line-through' }
        },
        3: {
          0: { fontFamily: 'Impact', fill: '#666', textDecoration: 'line-through' },
          1: { fontFamily: 'Impact', fill: '#666', textDecoration: 'line-through' },
          2: { fontFamily: 'Impact', fill: '#666', textDecoration: 'line-through' },
          3: { fontFamily: 'Impact', fill: '#666', textDecoration: 'line-through' },
          4: { fontFamily: 'Impact', fill: '#666', textDecoration: 'line-through' }
        }
      }
    });*/

    var iText2 = new fabric.IText(txt, {
      left: 0,
      top: 0,
      fontFamily: 'Helvetica',
      fill: '#000000'
      /*styles: {
        0: {
          0: { fill: 'red' },
          1: { fill: 'red' },
          2: { fill: 'red' }
        },
        2: {
          0: { fill: 'blue' },
          1: { fill: 'blue' },
          2: { fill: 'blue' },
          3: { fill: 'blue' }
        }
      }*/
    });

    //canvas.add(iText, iText2);
    canvas.add(iText2);
	//addTexts();
  }
