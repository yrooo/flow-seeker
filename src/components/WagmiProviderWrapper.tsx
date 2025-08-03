"use client";

import React from 'react';
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { WagmiConfig } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { defineChain } from 'viem';
import { http } from 'viem';

const queryClient = new QueryClient();

const config = getDefaultConfig({
  appName: 'Lisk Seeker',
  projectId: "8c8b28de1d0a192bb2777032dcfb7b58",
  chains: [
    defineChain({
      id: 1135,
      name: 'Lisk',
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
      rpcUrls: {
        default: { http: ['https://rpc.api.lisk.com'] },
      },
      blockExplorers: {
        default: { name: 'Liskscan', url: 'https://blockscout.lisk.com' },
      },
    }),
    defineChain({
      id: 4202,
      name: 'Lisk Sepolia Testnet',
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
      rpcUrls: {
        default: { http: ['https://rpc.sepolia-api.lisk.com'] },
      },
      blockExplorers: {
        default: { name: 'Lisk Sepolia Testnet Explorer', url: 'https://sepolia-blockscout.lisk.com' },
      },
    }),
  ],
  transports: {
    [1135]: http('https://rpc.api.lisk.com'),
    [4202]: http('https://rpc.sepolia-api.lisk.com'),
  },
});

export function WagmiProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
}