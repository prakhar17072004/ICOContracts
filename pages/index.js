import { useState } from 'react';
import ConnectWallet from '../components/ConnectWallet';
import TokenBalance from '../components/TokenBalance';
import SendTokens from '../components/SendTokens';
import "../app/globals.css"
const Home = () => {
    const [address, setAddress] = useState('');

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">Token DApp</h1>

            {/* Wallet Connect Section */}
            <div className="mb-6">
                <ConnectWallet setAddress={setAddress} />
            </div>

            {/* Token Balance and Send Tokens Sections */}
            {address && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Token Balance Component */}
                    <div className="bg-green-500 shadow-lg rounded-lg p-6">
                        <TokenBalance address={address} />
                    </div>

                    {/* Send Tokens Component */}
                    <div className="bg-black shadow-lg rounded-lg p-6">
                        <SendTokens address={address} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
