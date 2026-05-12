import React from 'react';
import { createRoot } from 'react-dom/client';
import { useRef, useEffect, useState} from 'react';
import './index.css';
import './App.css';
import App from './App.jsx';
import photoAssigner from './photoPickScript.jsx';
import { motion } from "motion/react"

import { tr } from 'motion/react-client';

  

    
const root = createRoot(document.getElementById('root'));

root.render(<App />);

