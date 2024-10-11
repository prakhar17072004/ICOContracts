import { useState } from 'react';
import { ethers } from 'ethers';
import "../app/globals.css";
import SendTokens from './SendTokens';

const ConnectWallet = () => {
    const [account, setAccount] = useState('');
    const [balance, setBalance] = useState('');

    const connectWallet = async () => {
        if (window.ethereum) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []); // Request accounts
            const signer = await provider.getSigner(); // Use await to get the signer
           const address = await signer.getAddress(); // Get the address
            setAccount(address);

            const balance = await provider.getBalance(address);
            setBalance(ethers.formatEther(balance));
        } else {
            alert("Please install MetaMask!");
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto text-center">
            <button
                onClick={connectWallet}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
            >
                Connect Wallet
            </button>

            {account && (
                <div className="mt-6">
                    <p className="text-gray-700 font-bold">Address: {account}</p>
                    <p className="text-xl text-gray-800 mt-2">
                        Ether Balance: <span className="text-green-500">{balance}</span> ETH
                        <SendTokens/>
                    </p>
                </div>
            )}
        </div>
    );
};

export default ConnectWallet;
