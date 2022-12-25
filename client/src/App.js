import './App.css';
import {useState,useEffect} from 'react'
import {ethers} from "ethers";
import Memos from './components/Memos';
import Buy from './components/Buy';
import cola from "./cola.jpg";
import abi from "./contract/Cola.json"
function App() {
const[state,setState] = useState
  ({
provider:null,
signer:null,
contract:null
  });
  const [account, setAccount] = useState("None");
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress ="0xbd93781acC3816272F936A2f87D9860405200998";
const contractABI = abi.abi;

try {
  const { ethereum } = window;

  if (ethereum) {
    const account = await ethereum.request({
      method: "eth_requestAccounts",
    });

    window.ethereum.on("chainChanged", () => {
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", () => {
      window.location.reload();
    });

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    setAccount(account);
    setState({ provider, signer, contract });
  } else {
    alert("Please install metamask");
  }
} catch (error) {
  console.log(error);
}
};
connectWallet();
}, []);

  return (
    <div style={{ backgroundColor: "#EFEFEF", height: "100%" }}>
      <img src={cola} className="img-fluid" alt=".." width="100%" />
      <p
        class="text-muted lead "
        style={{ marginTop: "10px", marginLeft: "5px" }}
      >
        <small>Connected Account - {account}</small>
      </p>
      <div className="container">
        <Buy state={state} />
        <Memos state={state} />
      </div>
    </div>
  );
}

export default App;
