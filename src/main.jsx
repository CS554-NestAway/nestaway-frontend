import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import fbconfig from './firebase/FirebaseConfig';
import {initializeApp} from 'firebase/app';

const app = initializeApp(fbconfig);

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
