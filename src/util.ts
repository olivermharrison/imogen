var TWEEN = require('@tweenjs/tween.js');
import * as THREE from 'three';


export const animateImage = (source: any[], target: any[], options: any) => {
    options = options || {};
    // get targets from options or set to defaults
    const to = target,
        easing = options.easing || TWEEN.Easing.Quadratic.In,
        duration = options.duration || 2000;
    // create the tween
    
    const tween = new TWEEN.Tween(source)
    tween.to(target, duration)
        .easing(easing)
        .onUpdate((d: any) => {
            if(options.update){ 
                options.update(d);
            }
         })
        .onComplete(function(){
          if(options.callback) options.callback();
        });
    // start the tween
    tween.start();
    // return the tween in case we want to manipulate it later on
    return tween;
}


export const resizeImage = (image: HTMLImageElement) => {

    // TODO cross browser
    const maxSize = 200;
    const maxWidth = (window.innerWidth * 0.3 <= maxSize) ? window.innerWidth * 0.3 : maxSize;
    const maxHeight = (window.innerHeight * 0.3 <= maxSize) ? window.innerHeight * 0.3 : maxSize;

    const originalWidth = image.width;
    const originalHeight = image.height;

    const widthFactor = originalWidth / maxWidth;
    const heightFactor = originalHeight / maxHeight;

    const scaleFactor = (widthFactor > heightFactor) ? widthFactor : heightFactor;

    const newWidth = Math.floor(originalWidth / scaleFactor);
    const newHeight = Math.floor(originalHeight / scaleFactor);

    console.log('Resizing image from ' + originalWidth + 'x' + originalHeight + ' to ' + newWidth + 'x' + newHeight);

    // create an off-screen canvas
    const canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = newWidth;
    canvas.height = newHeight;
    if (ctx) {
        ctx.drawImage(image, 0, 0, newWidth, newHeight);
    }

    // TODO delete this canvas

    // encode image to data-uri with base64 version of compressed image
    return canvas.toDataURL();
};
