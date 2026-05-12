import React from 'react';
import { createRoot } from 'react-dom/client';
import { useRef, useEffect, useState} from 'react';
import './index.css';
import './App.css';
import photoAssigner from './photoPickScript.jsx';
import { motion } from "motion/react"
import { button, div, h1, tr } from 'motion/react-client';

  const truePhotos = import.meta.glob(['./public/photos/truePhotos/*'], { eager: true });
  const falsePhotos = import.meta.glob(['./public/photos/falsePhotos/*'], { eager: true });
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
          <div className='selectedPip' style={{visibility: this.state.clicked ? 'visible' : 'hidden' }}> <p>AI</p></div>
          <img src={eval(photoMatrix[(this.state.photoNum)][1])} frameBorder="0"></img>
          </div>
          </motion.button>
        );
      }
    };


        export function scoringCounter(){
        let counter = 0;
        for (let index = 0; index < 9; index++) {
            if(buttonTruthMatirx[index][0] == buttonTruthMatirx[index][1]){
                counter++;
            }
        }
        return counter;
        
    }

    class PopUp extends React.Component{
    constructor(props){
      super(props);
      this.state ={
      show: true,
      whichMessage: true,
      counter : 0
      };
      this.toggleShow= this.toggleShow.bind(this);
      this.changeWhichMessage= this.changeWhichMessage.bind(this);
      this.counterChange = this.counterChange.bind(this);
    };
    toggleShow() {
        if (this.state.show == false){
            this.setState({ show: true });
        }
        else {
            this.setState({ show: false });
        }
    }
    changeWhichMessage(){
        this.state.whichMessage = false;
        
    }
    counterChange(){
        this.setState({counter : scoringCounter()})
    }
    

     render(){
        if(this.state.whichMessage == true){
            return(
                <div>
                <div className='PopUp' style={{visibility: this.state.show ? 'visible' : 'hidden' }}>
                <h1 className='sn-pro-plain' >Welcome to Detecterry</h1>
                <h2 className='sn-pro-plain'>Click on the images that you think are generated with Artificial Intelligence to mark them as fake</h2>
                <h2 className='sn-pro-plain'>Images correctly marked as fake will gain you a point</h2>
                <h2 className='sn-pro-plain'>Images incorrectly marked as fake will lose you a point</h2>
                <h2 className='sn-pro-plain'>When you have made your guess, click the score button to receive your score</h2>
                <button className='sn-pro-plain' onClick={() => {this.toggleShow();  this.changeWhichMessage()}}>Close</button>
                </div>
                <motion.button whileHover={{ scale: 1.1 , zIndex: 1000 }} whileTap={{ scale: 0.9 }}>
                    <h3 margin="0" className='sn-pro-plain'>Score</h3>
                </motion.button>
                </div>
            )
        }
        else if (this.state.whichMessage == false){
            return(
                <div>
                <div className='PopUp' style={{visibility: this.state.show ? 'visible' : 'hidden' }}>
                <h1 className='sn-pro-plain'>You Scored</h1>
                <h1 className='sn-pro-plain' >{this.state.counter} out of 9!</h1>
                <h2 className='sn-pro-plain'>Reload the page if you want to try guessing different photos</h2>
                <button className='sn-pro-plain' onClick={() => this.toggleShow()}>Close</button>
                </div>
            <motion.button whileHover={{ scale: 1.1 , zIndex: 1000 }} whileTap={{ scale: 0.9 }} onClick={() => {this.toggleShow(), this.counterChange()}}>
                <h3 className='sn-pro-plain' >Score</h3>
            </motion.button>
                </div>
            )
        }
        }  
    }


export default function App() {
    return(
        <div id='mainContainer'>
    <div>
      <h1  className='detecterryTitle supermercado-one-regular' >Detecterry</h1>
    </div>
    <div>
    </div>
    <div id='buttonContainer'>
      <ul id='buttonList'>
        <Photos photoNum="0"/>
        <Photos photoNum="1"/>
        <Photos photoNum="2"/>
        <Photos photoNum="3"/>
        <Photos photoNum="4"/>
        <Photos photoNum="5"/>
        <Photos photoNum="6"/>
        <Photos photoNum="7"/>
        <Photos photoNum="8"/>
        
      </ul>
    </div>
    <div>
        <PopUp />
      
    </div>
  </div>
)  
}

