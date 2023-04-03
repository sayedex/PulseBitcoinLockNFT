import { WagmiConfig, createClient } from "wagmi";
import { ConnectKitProvider, ConnectKitButton, getDefaultClient } from "connectkit";

import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { bsc,bscTestnet } from "wagmi/chains";
import { ethers } from "ethers";
import { chains,RPC_URL } from "../config/config";

export const provider = new ethers.providers.JsonRpcProvider(RPC_URL)


const alchemyId = process.env.alchemyId;
//  up client
//


export const client = createClient(
    getDefaultClient({
      appName: "Trstake",
      alchemyId,
      chains
    }),
  );

// Pass client to React Context Provider