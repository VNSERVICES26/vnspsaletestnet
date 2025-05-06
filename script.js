let web3;
let userAccount;

const vnsPresaleAddress = "0x4e8a2994f87843ad9EA5F6bda956aC1b181A3323";
const usdtTokenAddress = "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd";
const vnsTokenAddress = "0x76f8F13B04B85443afDE3D29991363BF54b756fD";

const vnsPresaleABI = [ {"inputs":[{"internalType":"address","name":"_vnsToken","type":"address"},{"internalType":"address","name":"_usdtToken","type":"address"},{"internalType":"address","name":"_sellerWallet","type":"address"},{"internalType":"address","name":"_paymentReceiver","type":"address"},{"internalType":"uint256","name":"_pricePerVNS","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newMin","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newMax","type":"uint256"}],"name":"MinMaxUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"oldOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"PriceUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"buyer","type":"address"},{"indexed":false,"internalType":"uint256","name":"vnsAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"usdtAmount","type":"uint256"}],"name":"TokensPurchased","type":"event"},{"inputs":[],"name":"CHANGE_DELAY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"vnsAmount","type":"uint256"}],"name":"buyTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"usdtAmount","type":"uint256"}],"name":"buyWithUSDT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"emergencyWithdrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"isPaused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastPriceChange","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxPurchase","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minPurchase","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paymentReceiver","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pricePerVNS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"recoverERC20","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sellerWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"newMin","type":"uint256"},{"internalType":"uint256","name":"newMax","type":"uint256"}],"name":"setMinMaxPurchase","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"setPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"usdtToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"vnsToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"} ];
const erc20ABI = [
  // केवल आवश्यक ERC20 फ़ंक्शंस
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [{"name": "", "type": "uint8"}],
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [{"name": "account", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"name": "", "type": "uint256"}],
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {"name": "spender", "type": "address"},
      {"name": "amount", "type": "uint256"}
    ],
    "name": "approve",
    "outputs": [{"name": "", "type": "bool"}],
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {"name": "owner", "type": "address"},
      {"name": "spender", "type": "address"}
    ],
    "name": "allowance",
    "outputs": [{"name": "", "type": "uint256"}],
    "type": "function"
  }
];

document.getElementById("connectButton").addEventListener("click", async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      userAccount = accounts[0];
      document.getElementById("status").innerText = "✅ वॉलेट कनेक्टेड: " + userAccount;
    } catch (error) {
      console.error(error);
      document.getElementById("status").innerText = "❌ वॉलेट कनेक्शन असफल";
    }
  } else {
    alert("कृपया MetaMask या कोई अन्य Web3 वॉलेट इंस्टॉल करें।");
  }
});

document.getElementById("vnsAmount").addEventListener("input", async () => {
  const vnsAmount = document.getElementById("vnsAmount").value;
  if (vnsAmount && web3) {
    const presaleContract = new web3.eth.Contract(vnsPresaleABI, vnsPresaleAddress);
    try {
      const pricePerVNS = await presaleContract.methods.pricePerVNS().call();
      const vnsToken = new web3.eth.Contract(erc20ABI, vnsTokenAddress);
      const decimals = await vnsToken.methods.decimals().call();
      const usdtAmount = (vnsAmount * pricePerVNS) / (10 ** decimals);
      document.getElementById("usdtAmount").value = usdtAmount.toFixed(6);
    } catch (error) {
      console.error(error);
      document.getElementById("usdtAmount").value = "";
    }
  } else {
    document.getElementById("usdtAmount").value = "";
  }
});

document.getElementById("buyButton").addEventListener("click", async () => {
  if (!web3 || !userAccount) {
    alert("कृपया पहले वॉलेट कनेक्ट करें।");
    return;
  }

  const vnsAmountInput = document.getElementById("vnsAmount").value;
  if (!vnsAmountInput || isNaN(vnsAmountInput) || vnsAmountInput <= 0) {
    alert("कृपया मान्य VNS मात्रा दर्ज करें।");
    return;
  }

  const vnsAmount = web3.utils.toBN(web3.utils.toWei(vnsAmountInput, 'ether')).div(web3.utils.toBN(10 ** 10)); // 8 दशमलव के लिए समायोजन

  const presaleContract = new web3.eth.Contract(vnsPresaleABI, vnsPresaleAddress);
  const usdtToken = new web3.eth.Contract(erc20ABI, usdtTokenAddress);
  const vnsToken = new web3.eth.Contract(erc20ABI, vnsTokenAddress);

  try {
    const pricePerVNS = await presaleContract.methods.pricePerVNS().call();
    const vnsDecimals = await vnsToken.methods.decimals().call();
    const usdtAmount = web3.utils.toBN(vnsAmount).mul(web3.utils.toBN(pricePerVNS)).div(web3.utils.toBN(10 ** vnsDecimals));

    const allowance = await usdtToken.methods.allowance(userAccount, vnsPresaleAddress).call();
    if (web3.utils.toBN(allowance).lt(usdtAmount)) {
      document.getElementById("status").innerText = "⏳ USDT के लिए अनुमति दी जा रही है...";
      await usdtToken.methods.approve(vnsPres
::contentReference[oaicite:0]{index=0}
 
