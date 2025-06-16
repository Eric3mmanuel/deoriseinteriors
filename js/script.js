const providerOptions = {
  walletconnect: {
    package: window.WalletConnectProvider.default,
    options: {
      rpc: {
        1: "https://eth-mainnet.g.alchemy.com/v2/cqDd53WKVGmFVBIVOaUNqjUnZKkukHPv",  // Ethereum Mainnet
        // Optional: Add testnets or other chains
         5: "https://eth-goerli.g.alchemy.com/v2/cqDd53WKVGmFVBIVOaUNqjUnZKkukHPv",  // Goerli Testnet
        137: "https://polygon-mainnet.g.alchemy.com/v2/cqDd53WKVGmFVBIVOaUNqjUnZKkukHPv",  // Polygon
        80001: "https://polygon-mumbai.g.alchemy.com/v2/cqDd53WKVGmFVBIVOaUNqjUnZKkukHPv" // Mumbai Testnet
      }
    }
  }
};

const web3Modal = new window.Web3Modal.default({
  cacheProvider: false,
  providerOptions
});

const connectWalletBtn = document.getElementById("connectWalletBtn");
const walletAddressDisplay = document.getElementById("walletAddress");

connectWalletBtn.addEventListener("click", async () => {
  try {
    const instance = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(instance);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();

    walletAddressDisplay.innerText = `Connected: ${address}`;
  } catch (err) {
    console.error("Wallet connection failed", err);
  }
});

//After successful connection,get the wallet address

const provider = await web3Modal.connect();
const web3Provider = new ethers.providers.Web3Provider(provider);
const signer = web3Provider.getSigner();

const userAddress = await signer.getAddress();
console.log("User Address:", userAddress);

document.getElementById("walletAddress").innerText = "Wallet: " + userAddress;

//show balance 

const balance = await web3Provider.getBalance(userAddress);
const ethBalance = ethers.utils.formatEther(balance);
console.log("Balance:", ethBalance);

document.getElementById("walletBalance").innerText = "Balance: " + ethBalance + " ETH";
