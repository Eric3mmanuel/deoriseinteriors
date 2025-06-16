import {
  createWeb3Modal,
  defaultConfig
} from "https://unpkg.com/@web3modal/html?module";

// Replace this with your actual WalletConnect Project ID
const projectId = "60d5a2b08a9b1f03343157079343ea20";

const metadata = {
  name: "3ric3mmanu3l's Web3 sites",
  description: "Connecting you to a decentralised world",
  url: "https://3ric3mmanu3l.vercel.app", // Replace with your real URL
  icons: ["https://yourwebsite.com/icon.png"]
};

// Initialize Web3Modal
const modal = createWeb3Modal({
  projectId,
  themeMode: "dark",
  themeVariables: {
    "--w3m-accent-color": "#4e44ce",
  },
  metadata
});

// Optional: You can listen for events or manually get provider when button is clicked
const button = document.querySelector("w3m-core-button");

button.addEventListener("click", async () => {
  try {
    const provider = await modal.openModal(); // this opens the modal
    const ethersProvider = new ethers.providers.Web3Provider(provider);
    const signer = ethersProvider.getSigner();

    const address = await signer.getAddress();
    const balance = await ethersProvider.getBalance(address);
    const ethBalance = ethers.utils.formatEther(balance);

    document.getElementById("walletAddress").innerText = "Wallet: " + address;
    document.getElementById("walletBalance").innerText = "Balance: " + ethBalance + " ETH";
  } catch (err) {
    console.error("Connection failed:", err);
  }
});