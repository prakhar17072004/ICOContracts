import { useState } from 'react';
import { ethers } from 'ethers';
import MyTokenABI from '../abi/MyTokenABI.json';
import "../app/globals.css"

const tokenAddress = '0xF845d476e52488Fb18101253daEaCB6b35c25D7D'; // Replace with your token contract address

const TokenBalance = () => {
    const [account, setAccount] = useState('');
    const [tokenBalance, setTokenBalance] = useState('');

    const connectWallet = async () => {
        if (window.ethereum) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            setAccount(address);

            const contract = new ethers.Contract(tokenAddress, MyTokenABI, signer);
            const balance = await contract.balanceOf(address);
            setTokenBalance(ethers.formatUnits(balance, 18)); // Token has 18 decimals
        } else {
            alert('MetaMask is not installed');
        }
    };

    return (
        <div className="bg-red-300 shadow-lg rounded-lg p-6 max-w-md mx-auto text-center">
            <button
                onClick={connectWallet}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
            >
                Show Token Balance
            </button>

            {account && (
                <div className="mt-6">
                    <p className="text-gray-700 font-bold">Account: {account}</p>
                    <p className="text-xl text-gray-800 mt-2">
                        Token Balance: <span className="text-green-500">{tokenBalance}</span> MTK
                    </p>
                </div>
            )}
        </div>
    );
};

export default TokenBalance;
