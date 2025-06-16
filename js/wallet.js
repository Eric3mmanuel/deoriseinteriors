import { createWeb3Modal } from "https://unpkg.com/@web3modal/html?module";

// Setup modal
const modal = createWeb3Modal({
  projectId: "YOUR_WALLETCONNECT_PROJECT_ID", // from WalletConnect Cloud
  themeMode: "dark", // or 'light'
  themeColorMode: "auto", // auto-switching
});

// Open modal when button clicked
document.querySelector("w3m-core-button").addEventListener("click", async () => {
  const provider = await modal.openModal(); // opens the modal
  const ethersProvider = new ethers.providers.Web3Provider(provider);
  const signer = ethersProvider.getSigner();

  const address = await signer.getAddress();
  const balance = await ethersProvider.getBalance(address);
  const ethBalance = ethers.utils.formatEther(balance);

  console.log("Address:", address);
  console.log("Balance:", ethBalance);
});