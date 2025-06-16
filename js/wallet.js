import { createWeb3Modal } from "https://unpkg.com/@web3modal/html?module";

// Setup modal
const modal = createWeb3Modal({
  projectId: "60d5a2b08a9b1f03343157079343ea20", // from WalletConnect Cloud
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