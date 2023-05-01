var image = null;
var grayImage = null;
var redImage = null;
var swapImage = null;
var rainbowImage = null;
var blurImage = null;
var canvas;

function loadImage() {
  var imageInput = document.getElementById("upload");
  image = new SimpleImage(imageInput);
  grayImage = new SimpleImage(imageInput);
  redImage = new SimpleImage(imageInput);
  swapImage = new SimpleImage(imageInput);
  rainbowImage = new SimpleImage(imageInput);
  blurImage = new SimpleImage(imageInput);
  canvas = document.getElementById("canvas");
  image.drawTo(canvas);
  return;  
}

function imageIsLoaded() {
  if (image == null || !image.complete()) {
    return false;
  } else {
    return true;
  }
}

function filterGray() {
  for (var pixel of grayImage.values()){
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    pixel.setRed(avg);
    pixel.setGreen(avg);
    pixel.setBlue(avg);    
  }
  return grayImage;
}

function doGray() {
  if (imageIsLoaded(grayImage)) {
    filterGray();
    grayImage.drawTo(canvas);
  }
}

function filterRed () {
  for (var pixel of redImage.values()) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    if (avg < 128) {
      pixel.setRed(avg * 2);
      pixel.setGreen(0);
      pixel.setBlue(0);
    } else {
      pixel.setRed(255);
      pixel.setGreen(avg * 2);
      pixel.setBlue(avg * 2);
    }
  }
  canvas = document.getElementById("canvas");
  redImage.drawTo(canvas);
}

function doRed() {
  if (imageIsLoaded(redImage)) {
    filterRed();
    redImage.drawTo(canvas);
  }
}

function swapGreenRed() {
  for (var pixel of swapImage.values()) {
    var x = pixel.getGreen();
    pixel.setGreen(pixel.getRed());
    pixel.setRed(x);
  }
  canvas = document.getElementById("canvas");
  swapImage.drawTo(canvas);
}

function doSwap() {
  if (imageIsLoaded(swapImage)) {
    swapGreenRed();
    swapImage.drawTo(canvas);
  }
}

function resetImage() {
  if (imageIsLoaded) {
    image.drawTo(canvas);
  }
}

function filterRainbow() {
  var height = rainbowImage.getHeight();
  for (var pixel of rainbowImage.values()) {
    var y = pixel.getY();
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    if (y < height / 7) {
      //red
      if (avg < 128) {
        pixel.setRed(2 * avg);
        pixel.setGreen(0);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y < height * 2 / 7) {
      //orange
      if (avg < 128) {
        pixel.setRed(2 * avg);
        pixel.setGreen(0.8*avg);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(1.2*avg-51);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y < height * 3 / 7) {
      //yellow
      if (avg < 128) {
        pixel.setRed(2 * avg);
        pixel.setGreen(2*avg);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(255);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y < height * 4 / 7) {
      //green
      if (avg < 128) {
        pixel.setRed(0);
        pixel.setGreen(2*avg);
        pixel.setBlue(0);
      } else {
        pixel.setRed(2*avg-255);
        pixel.setGreen(255);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y < height * 5 / 7) {
      //blue
      if (avg < 128) {
        pixel.setRed(0);
        pixel.setGreen(0);
        pixel.setBlue(2*avg);
      } else {
        pixel.setRed(2*avg-255);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(255);
      }
    } else if (y < height * 6 / 7) {
      //indigo
      if (avg < 128) {
        pixel.setRed(.8*avg);
        pixel.setGreen(0);
        pixel.setBlue(2*avg);
      } else {
        pixel.setRed(1.2*avg-51);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(255);
      }
    } else {
      //violet
      if (avg < 128) {
        pixel.setRed(1.6*avg);
        pixel.setGreen(0);
        pixel.setBlue(1.6*avg);
      } else {
        pixel.setRed(0.4*avg+153);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(0.4*avg+153);
      }
    }
  }
}

function doRainbow() {
  if (imageIsLoaded(rainbowImage)) {
    filterRainbow();
    rainbowImage.drawTo(canvas);
  }
}

function getNewPixel(x,y) {
  var height = blurImage.getHeight();
  var width = blurImage.getWidth();
  var randomX = Math.floor(Math.random()*10);
  var randomY = Math.floor(Math.random()*10);
  if (randomX > width-1) {
    randomX = width-1;
  }
  else if(randomX < 0) {
    randomX = 0;
  }
  if (randomY > height-1) {
    randomY = height-1
  }
  else if (randomY < 0) {
    randomY = 0;
  }
  var newPixel = blurImage.getPixel(randomX, randomY);
  blurImage.setPixel(x, y, newPixel);
}

function doBlur() {
 for (var pixel of blurImage.values()) {
    var random = Math.random();
    var x = pixel.getX();
    var y = pixel.getY();
  if (random < 0.5) {
     blurImage.setPixel(x,y, pixel);
     } else {
     getNewPixel(x,y);
    }
  }
  blurImage.drawTo(canvas);
}
