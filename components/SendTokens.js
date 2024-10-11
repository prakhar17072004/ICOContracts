import { useState } from 'react';
import { ethers } from 'ethers';
import MyTokenABI from '../abi/MyTokenABI.json';
import "../app/globals.css"

const tokenAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138'; // Replace with your token contract address

const SendTokens = () => {
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');

    const transferTokens = async () => {
        if (!window.ethereum || !recipient || !amount) return;

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(tokenAddress, MyTokenABI, signer);

        try {
            const tx = await contract.transfer(recipient, ethers.parseUnits(amount, 18)); // Token has 18 decimals
            console.log('Transaction submitted', tx);
            await tx.wait();
            console.log('Transaction confirmed', tx);
            alert('Tokens sent successfully!');
        } catch (error) {
            console.error('Transaction failed', error);
            alert('Transaction failed! Please check the console for details.');
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto mt-6">
            <h2 className="text-lg font-bold mb-4">Send Tokens</h2>
            <input
                type="text"
                placeholder="Recipient Address"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="border border-gray-300 rounded-md p-2 mb-4 w-full"
            />
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border border-gray-300 rounded-md p-2 mb-4 w-full"
            />
            <button
                onClick={transferTokens}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md w-full"
            >
                Send Tokens
            </button>
        </div>
    );
};

export default SendTokens;
