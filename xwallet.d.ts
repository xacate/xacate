
import { JsonRpcProvider, BrowserProvider, BaseContractMethod, Contract } from 'ethers';
declare interface NetworkConfig {
    chainId: number
    host: string
}
// base type
declare class XBaseWalletType {
    getRightChainId: () => number
    getRightChainName: () => string
    getRightChainHost: () => string
    getRightChainExplorer: () => string
    getRightTokenName: () => string
    getDisRequestType: () => boolean
    listenAccountChanged: (accounts: string[]) => void
    listenChainIdChanged: (chainId: number) => void
}
// method type 
declare class XBaseWalletTypeMethod {
    getName: () => string
    getWalletName: () => Promise<string>
    getProvider: () => Promise<any>
    connectWallet: () => Promise<boolean>
    getCurrentChainId: () => Promise<string>
    switchEthereumChain: (chainId: stirng) => Promise<boolean>
    getDefaultAccount: () => Promise<string>
    disconnect: (status?: boolean) => Promise<boolean>
}

// default type
declare class XDefaultWalletType implements XBaseWalletType {
    getProvider: () => Promise<any>
}
// metamask type
declare class XMetaMaskType extends XBaseWalletTypeMethod implements XBaseWalletType {
    abstract getChainsInfo: (chainId: string) => {
        chainId: string
        rpcUrl: string
        explorer?: string
        token: string
        chainName: string
        decimals?: number
    }
}
declare class XWalletConnect extends XBaseWalletTypeMethod implements XBaseWalletType {
    projectId: () => string
    getRpc: () => { [key: number]: string }
}


declare class XBaseWallet {
    abstract initBaseProvider: () => {
        [key: string]: JsonRpcProvider
    }
    abstract initProvider: () => { [key: string]: any }
    abstract initMethod: () => void
    createBaseProvider: (host: string) => JsonRpcProvider
    getCurrentBaseProvider: (chainId: string) => JsonRpcProvider
    getCurrentProvider: () => Promise<BrowserProvider>
    getWallet: <E extends XBaseWalletType> () => E
    connectWallet: (name: string) => Promise<boolean>
    getDefaultAccount: () => Promise<string>
    signMessage: (message: any) => Promise<string>
    disconnect: () => Promise<boolean>
    getWalletName: () => Promise<string>
    switchEthereumChain: (chainId: stirng) => Promise<boolean>
    getCurrentChainId: () => Promise<string>
}



declare class XBaseWalletMethod<T extends XBaseWallet>{
    constructor(wallet: T);
    abstract getRightChainId: () => string
    abstract getContractAbi: () => []
    abstract getContractAddress: () => string
    abstract contractDataMap: () => { [key: string]: { address: string, abi: {}[] } }
    getWallet: () => T;
    getDefaultAccount: () => Promise<string>;
    getBaseContract: (name?: string, chainId?: string) => Contract;
    getContract: (name?: string) => Promise<Contract>;
    transcationGasResult: (method: BaseContractMethod, argument: any[], loading?: any) => Promise<[boolean, string]>
    transcationResult: (method: Promsie<any>, loading?: any) => Promise<[boolean, string]>
}



declare const parseJsonRpc: (e) => string
declare const isAddress: (value: string) => boolean
