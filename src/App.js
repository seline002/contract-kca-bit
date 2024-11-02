import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';

const ADDRESS = "0x604aAFDc2D957525099efD7F19b0E74d985026d0";
const ABI = [{ "inputs": [{ "internalType": "uint256", "name": "startingpoint", "type": "uint256" }, { "internalType": "string", "name": "_startingMessage", "type": "string" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "decreaseNumber", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getNumber", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "increaseNumber", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "message", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "newMessage", "type": "string" }], "name": "setMessage", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]

function App() {
    const [number, setNumber] = useState('none');
    const [currentMessage, setCurrentMessage] = useState('none');
    const [newMessage, setNewMessage] = useState('');

    const web3 = new Web3(window.ethereum);
    const myContract = new web3.eth.Contract(ABI, ADDRESS);

    async function getNumber() {
        const result = await myContract.methods.getNumber().call();
        setNumber(result.toString());
    }

    async function getMessage() {
        const message = await myContract.methods.message().call();
        setCurrentMessage(message);
    }

    async function increaseNumber() {
        const accountConnected = await web3.eth.requestAccounts();
        await myContract.methods.increaseNumber().send({ from: accountConnected[0] });
        getNumber();
    }

    async function decreaseNumber() {
        const accountPresent = await web3.eth.requestAccounts();
        await myContract.methods.decreaseNumber().send({ from: accountPresent[0] });
        getNumber();
    }

    async function updateMessage() {
        const connectedAccounts = await web3.eth.requestAccounts();
        await myContract.methods.setMessage(newMessage).send({ from: connectedAccounts[0] });
        getMessage();
    }

    return ( <
        div className = 'App' >
        <
        div className = 'App-header' >
        <
        img src = { logo }
        className = 'App-logo'
        alt = 'logo' / >
        <
        button onClick = { getNumber } > Get Number < /button> <
        button onClick = { increaseNumber } > Increase Number < /button> <
        button onClick = { decreaseNumber } > Decrease Number < /button> <
        p > Number: { number } < /p> <
        button onClick = { getMessage } > Get Message < /button> <
        p > Message: { currentMessage } < /p> <
        input type = 'text'
        value = { newMessage }
        onChange = {
            (e) => setNewMessage(e.target.value)
        }
        placeholder = 'Enter new Message' /
        >
        <
        button onClick = { updateMessage } > Update Message < /button> < /
        div > <
        /div>
    );
}



export default App;