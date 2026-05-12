import React from 'react';
import { useRef, useEffect, useState} from 'react';

function getRandomInt(max) {
    let number = 0;
    do {
        
    number = Math.floor(Math.random() * max);
    } while (number < 1);
    return number
  }

/* This picks randomly which photo numbers will be real and fake */
function photoNumberPicker() {
let photoArray = [];
let realPhotosNumber = (getRandomInt(4) + 3)
/* This means that 2-4 pictures will be fake */
let fakePhotosNumber = 9 - realPhotosNumber
for (let index = 0; index < 9; index++) {
    photoArray.push(true);
}
for (let index = 0; index < fakePhotosNumber; index++) {
    let currentIndex = getRandomInt(10);
    if (photoArray[currentIndex] != false) {
        photoArray[currentIndex] = false;
    }
    else {
        index - 1;
    }
    
}
return photoArray;
}

/* This creates a map for each photo that packs it's index with its boolean and the photo id  */
function photoMapBuilder () {
    let photoNumbers = photoNumberPicker();
    let filledPhotoMap = new Map();
    let reserveList = [];
    let reserveId
    for (let index = 0; index < 9; index++) {
        filledPhotoMap.set(index,photoNumbers[index]); /* Sets each index of the photoMap with the boolean chosen by photoNumberPicker  */
    }
    for (let index = 0; index < 9; index++) { /* This reserves a photo id in the map */
        do {
        if (filledPhotoMap.get(index)){
            reserveId = ("true," + (getRandomInt(40)+1)); /* This is the number of photos in the true database table*/
        } else {
            reserveId = ("false," + (getRandomInt(40)+1)); /* This is the number of photos in the false database table*/
        }   
        } while (reserveList.includes(reserveId,0));

        reserveList.push(reserveId);
        filledPhotoMap.set(index,reserveId);

        
    }

return filledPhotoMap;
}



function mapUnpacker(mapItem){
    let arr = mapItem.split(",");
    return arr;
}


export default function photoAssigner(){
    let filledPhotoMap = photoMapBuilder();
    let currentPos = [];
    let thisId = "";
    let outputMatrix = [];
    for (let index = 0; index < 9; index++) {
        currentPos = mapUnpacker(filledPhotoMap.get(index))
        if (currentPos[0] == "true"){
            let tempArray = [];
            let currentName = ('truePhotos[\'./public/photos/truePhotos/' + currentPos[1] + '.png\'].default')
                tempArray[0] = index;
                tempArray[1] = currentName;
                tempArray[2] = true;
                outputMatrix.push(tempArray);
            
        } else {
                let tempArray = [];
                let currentName = ('falsePhotos[\'./public/photos/falsePhotos/' + currentPos[1] + '.jpg\'].default') /* need to add '' or "" in */
                tempArray[0] = index;
                tempArray[1] = currentName;
                tempArray[2] = false;
                outputMatrix.push(tempArray);
        }       
    }

    return outputMatrix;
}