
import React from 'react';
import { createRoot } from 'react-dom/client';
import { useRef, useEffect, useState} from 'react';
import './index.css';
import './App.css';
import { motion } from "motion/react"
import photoAssigner from './photoPickScript.jsx';



const truePhotos = import.meta.glob(['./assets/photos/truePhotos/*'], { eager: true });
  const falsePhotos = import.meta.glob(['./assets/photos/falsePhotos/*'], { eager: true });
  const photoMatrix = photoAssigner();
  function buttonTruthAssign(){
    let buttonTruthMatirx = [];
    for (let index = 0; index < 9; index++) {
                let tempArray = [];
                tempArray[0] = eval(photoMatrix[index][2]);
                tempArray[1] = true;
                buttonTruthMatirx.push(tempArray);

    }
    return buttonTruthMatirx;
  }
  
  const buttonTruthMatirx = buttonTruthAssign();



 class Photos extends React.Component{
    constructor(props){
      super(props);
      this.state ={
      photoNum: 0,
      clicked: false
      };
        this.toggleClicked= this.toggleClicked.bind(this);
        this.buttonClickedAssign= this.buttonClickedAssign.bind(this);
    };
    toggleClicked() {
        this.setState(oldState => ({clicked: !oldState.clicked}));
    }
    
    static getDerivedStateFromProps(props, state) {
    return {photoNum: props.photoNum };
    }

    buttonClickedAssign(){
        buttonTruthMatirx[this.state.photoNum][1] = this.state.clicked;
    }
    
    
    render() {
        return(
          <motion.button whileHover={{ scale: 1.2 , zIndex: 1000 }}  whileTap={{ scale: 0.8 }} id='button0' className='pictureButton' onClick={() => {this.toggleClicked();  this.buttonClickedAssign()}}>
          <div className='pictureContainer'>
          <div className='selectedPip' style={{visibility: this.state.clicked ? 'visible' : 'hidden' }}></div>
          <img src={eval(photoMatrix[(this.state.photoNum)][1])} frameBorder="0"></img>
          <div className='buttonOverlay'></div>
          </div>
          </motion.button>
        );
      }
    };

     function scoringCounter(){
        let counter = 0;
        for (let index = 0; index < 9; index++) {
            if(buttonTruthMatirx[index][0] == buttonTruthMatirx[index][1]){
                counter++;
            }
        }
        return counter;
    }
