import React from 'react';
import { motion } from "motion/react"
import { div } from 'motion/react-client';
import { useState, createContext, useContext } from 'react';
import {scoringCounter, buttonTruthMatirx} from './App.jsx';


class PopUp extends React.Component{
    constructor(props){
      super(props);
      this.state ={
      show: true,
      whichMessage: true,
      score: 0
      };
      this.toggleShow= this.toggleShow.bind(this);
      this.changeWhichMessage= this.changeWhichMessage.bind(this);
    };
    toggleShow() {
        if (this.state.show == false){
            this.setState({ show: true });
        }
        else {
            this.setState({ show: false });
        }
        console.log(this.state.show, this.state.whichMessage)
    }
    changeWhichMessage(){
        this.state.whichMessage = false;
        
    }
    /*
    static getDerivedStateFromProps(props, state) {
        return {score: props.score };
    }
    */
     render(){
        if(this.state.whichMessage == true){
            return(
                <div>
                <div className='PopUp' style={{visibility: this.state.show ? 'visible' : 'hidden' }}>
                <h1>Start</h1>
                <button onClick={() => {this.toggleShow();  this.changeWhichMessage()}}>Close</button>
                </div>
                <motion.button whileHover={{ scale: 1.1 , zIndex: 1000 }} whileTap={{ scale: 0.9 }} onClick={() => {this.toggleShow()}}>
                    <h2>Next</h2>
                </motion.button>
                </div>
            )
        }
        else if (this.state.whichMessage == false){
            return(
                <div>
                <div className='PopUp' style={{visibility: this.state.show ? 'visible' : 'hidden' }}>
                <h1>You Scored</h1>
                <h1>{() => scoringCounter()} out of 9!</h1>
                <button onClick={() => this.toggleShow()}>Close</button>
                </div>
            <motion.button whileHover={{ scale: 1.1 , zIndex: 1000 }} whileTap={{ scale: 0.9 }} onClick={() => {this.toggleShow()}}>
                <h2>Next</h2>
            </motion.button>
                </div>
            )
        }
        }  
    }
