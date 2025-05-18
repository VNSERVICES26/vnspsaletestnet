// Contract ABI - Updated with correct buyTokens function signature
const presaleABI = [
    {
        "inputs": [
            {"internalType": "address", "name": "_vnsToken", "type": "address"},
            {"internalType": "address", "name": "_usdtToken", "type": "address"},
            {"internalType": "address", "name": "_sellerWallet", "type": "address"},
            {"internalType": "address", "name": "_paymentReceiver", "type": "address"},
            {"internalType": "uint256", "name": "_initialPrice", "type": "uint256"},
            {"internalType": "uint256", "name": "_minPurchase", "type": "uint256"}
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {"indexed": true, "internalType": "address", "name": "buyer", "type": "address"},
            {"indexed": false, "internalType": "uint256", "name": "vnsAmount", "type": "uint256"},
            {"indexed": false, "internalType": "uint256", "name": "usdtAmount", "type": "uint256"}
        ],
        "name": "TokensPurchased",
        "type": "event"
    },
    {
        "inputs": [
            {"internalType": "uint256", "name": "vnsAmount", "type": "uint256"}
        ],
        "name": "buyTokens",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "isPaused",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "minPurchase",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "pause",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "paymentReceiver",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "pricePerVNS",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {"internalType": "address", "name": "newReceiver", "type": "address"}
        ],
        "name": "setPaymentReceiver",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {"internalType": "uint256", "name": "newPrice", "type": "uint256"}
        ],
        "name": "setPrice",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {"internalType": "address", "name": "newToken", "type": "address"}
        ],
        "name": "setVnsToken",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "sellerWallet",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "unpause",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "usdtToken",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "vnsToken",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    }
];

// USDT Token ABI (simplified)
const erc20ABI = [
    {
        "constant": true,
        "inputs": [{"name": "_owner", "type": "address"}],
        "name": "balanceOf",
        "outputs": [{"name": "balance", "type": "uint256"}],
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {"name": "_spender", "type": "address"},
            {"name": "_value", "type": "uint256"}
        ],
        "name": "approve",
        "outputs": [{"name": "success", "type": "bool"}],
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {"name": "_owner", "type": "address"},
            {"name": "_spender", "type": "address"}
        ],
        "name": "allowance",
        "outputs": [{"name": "remaining", "type": "uint256"}],
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [{"name": "", "type": "uint8"}],
        "type": "function"
    }
];

// Contract addresses (replace with your actual addresses)
const presaleContractAddress = "0x1d696372c231160765ea55294B545451560451b0"; 
const usdtTokenAddress = "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd"; 

let web3;
let accounts = [];
let presaleContract;
let usdtContract;

// DOM elements
const connectWalletBtn = document.getElementById('connect-wallet');
const walletAddressSpan = document.getElementById('wallet-address');
const vnsAmountInput = document.getElementById('vns-amount');
const usdtEquivalentSpan = document.getElementById('usdt-equivalent');
const approveUsdtBtn = document.getElementById('approve-usdt');
const buyTokensBtn = document.getElementById('buy-tokens');
const currentPriceSpan = document.getElementById('current-price');
const sellerBalanceSpan = document.getElementById('seller-balance');
const usdtBalanceSpan = document.getElementById('usdt-balance');
const minPurchaseSpan = document.getElementById('min-purchase');
const vnsAddressSpan = document.getElementById('vns-address');
const approvalStatusSpan = document.getElementById('approval-status');
const transactionStatusDiv = document.getElementById('transaction-status');
const copyButtons = document.querySelectorAll('.copy-btn');

// Initialize the application
async function init() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        
        try {
            // Check if already connected
            accounts = await web3.eth.getAccounts();
            if (accounts.length > 0) {
                updateUI();
                initializeContracts();
            }
            
            setupEventListeners();
        } catch (error) {
            console.error("Initialization error:", error);
            showTransactionStatus("Please connect your wallet", "error");
        }
    } else {
        showTransactionStatus("Please install MetaMask", "error");
    }
}

function initializeContracts() {
    presaleContract = new web3.eth.Contract(presaleABI, presaleContractAddress);
    usdtContract = new web3.eth.Contract(erc20ABI, usdtTokenAddress);
    loadContractData();
}

// Set up event listeners
function setupEventListeners() {
    connectWalletBtn.addEventListener('click', connectWallet);
    vnsAmountInput.addEventListener('input', updateUsdtEquivalent);
    approveUsdtBtn.addEventListener('click', approveUsdt);
    buyTokensBtn.addEventListener('click', buyTokens);
    
    copyButtons.forEach(btn => {
        btn.addEventListener('click', handleCopy);
    });

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);
    window.ethereum.on('disconnect', handleDisconnect);
}

async function connectWallet() {
    try {
        accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        updateUI();
        initializeContracts();
    } catch (error) {
        console.error("Connection error:", error);
        showTransactionStatus("Wallet connection failed", "error");
    }
}

function handleAccountsChanged(newAccounts) {
    accounts = newAccounts;
    updateUI();
    if (accounts.length > 0) {
        loadContractData();
    } else {
        resetUI();
    }
}

function handleChainChanged() {
    window.location.reload();
}

function handleDisconnect() {
    accounts = [];
    updateUI();
    resetUI();
}

function handleCopy(e) {
    e.stopPropagation();
    const textToCopy = e.target.closest('.copyable').textContent.trim().split(' ')[0];
    navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = e.target.innerHTML;
        e.target.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => {
            e.target.innerHTML = originalText;
        }, 2000);
    });
}

// Update UI based on wallet connection
function updateUI() {
    if (accounts.length > 0) {
        connectWalletBtn.style.display = 'none';
        walletAddressSpan.textContent = `${accounts[0].substring(0, 6)}...${accounts[0].substring(38)}`;
        walletAddressSpan.style.display = 'inline-block';
    } else {
        connectWalletBtn.style.display = 'inline-block';
        walletAddressSpan.style.display = 'none';
    }
}

function resetUI() {
    currentPriceSpan.textContent = 'Loading...';
    sellerBalanceSpan.textContent = 'Loading...';
    usdtBalanceSpan.textContent = '0.0';
    minPurchaseSpan.textContent = 'Loading...';
    approvalStatusSpan.textContent = 'Not Approved';
    approveUsdtBtn.disabled = true;
    buyTokensBtn.disabled = true;
}

// Load contract data
async function loadContractData() {
    try {
        // Load VNS token address
        const vnsTokenAddress = await presaleContract.methods.vnsToken().call();
        vnsAddressSpan.textContent = vnsTokenAddress + ' ';
        
        // Load price
        const price = await presaleContract.methods.pricePerVNS().call();
        currentPriceSpan.textContent = `${web3.utils.fromWei(price, 'mwei')} USDT`;
        
        // Load min purchase
        const minPurchase = await presaleContract.methods.minPurchase().call();
        minPurchaseSpan.textContent = `${web3.utils.fromWei(minPurchase, 'mwei')} VNS`;
        
        // Load seller balance
        const sellerWallet = await presaleContract.methods.sellerWallet().call();
        const vnsTokenContract = new web3.eth.Contract(erc20ABI, vnsTokenAddress);
        const sellerBalance = await vnsTokenContract.methods.balanceOf(sellerWallet).call();
        sellerBalanceSpan.textContent = `${web3.utils.fromWei(sellerBalance, 'mwei')} VNS`;
        
        // Load user balance and allowance
        if (accounts.length > 0) {
            const usdtBalance = await usdtContract.methods.balanceOf(accounts[0]).call();
            usdtBalanceSpan.textContent = `${web3.utils.fromWei(usdtBalance, 'ether')} USDT`;
            
            const allowance = await usdtContract.methods.allowance(accounts[0], presaleContractAddress).call();
            updateApprovalStatus(allowance);
        }
    } catch (error) {
        console.error("Error loading data:", error);
        showTransactionStatus("Error loading contract data", "error");
    }
}

function updateApprovalStatus(allowance) {
    if (BigInt(allowance) > 0) {
        approvalStatusSpan.textContent = "Approved";
        approvalStatusSpan.style.color = "#2ecc71";
        approveUsdtBtn.disabled = true;
        buyTokensBtn.disabled = false;
    } else {
        approvalStatusSpan.textContent = "Not Approved";
        approvalStatusSpan.style.color = "#e74c3c";
        approveUsdtBtn.disabled = false;
        buyTokensBtn.disabled = true;
    }
}

// Update USDT equivalent
function updateUsdtEquivalent() {
    const vnsAmount = parseFloat(vnsAmountInput.value);
    if (!isNaN(vnsAmount) && vnsAmount > 0) {
        const priceText = currentPriceSpan.textContent.split(' ')[0];
        const price = parseFloat(priceText);
        
        if (!isNaN(price)) {
            const usdtEquivalent = (vnsAmount * price).toFixed(6);
            usdtEquivalentSpan.textContent = usdtEquivalent;
            
            // Enable buy button if approved
            if (approvalStatusSpan.textContent === "Approved") {
                buyTokensBtn.disabled = false;
            }
        }
    } else {
        usdtEquivalentSpan.textContent = '0';
        buyTokensBtn.disabled = true;
    }
}

// Approve USDT
async function approveUsdt() {
    if (accounts.length === 0) return;
    
    try {
        showTransactionStatus("Approving USDT...", "info");
        approveUsdtBtn.disabled = true;
        
        const amountToApprove = web3.utils.toBN('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');
        
        const tx = await usdtContract.methods.approve(presaleContractAddress, amountToApprove)
            .send({ from: accounts[0] });
            
        showTransactionStatus("USDT successfully approved!", "success");
        
        // Update allowance status
        const allowance = await usdtContract.methods.allowance(accounts[0], presaleContractAddress).call();
        updateApprovalStatus(allowance);
    } catch (error) {
        console.error("Approval error:", error);
        showTransactionStatus(`Approval failed: ${error.message}`, "error");
        approveUsdtBtn.disabled = false;
    }
}

// Buy tokens with all checks
async function buyTokens() {
    if (accounts.length === 0) return;
    
    const vnsAmount = parseFloat(vnsAmountInput.value);
    if (isNaN(vnsAmount) || vnsAmount <= 0) {
        showTransactionStatus("Please enter valid VNS amount", "error");
        return;
    }
    
    try {
        showTransactionStatus("Processing purchase...", "info");
        buyTokensBtn.disabled = true;
        
        // 1. Check contract pause status
        const isPaused = await presaleContract.methods.isPaused().call();
        if (isPaused) {
            throw new Error("Presale is currently paused");
        }
        
        // 2. Convert amount to wei (8 decimals)
        const vnsAmountWei = web3.utils.toWei(vnsAmount.toString(), 'mwei');
        
        // 3. Calculate required USDT
        const pricePerVNS = await presaleContract.methods.pricePerVNS().call();
        const usdtAmount = (BigInt(vnsAmountWei) * BigInt(pricePerVNS)) / BigInt(10**8);
        
        // 4. Check balances and allowance
        const checks = await Promise.all([
            usdtContract.methods.balanceOf(accounts[0]).call(),
            usdtContract.methods.allowance(accounts[0], presaleContractAddress).call(),
            presaleContract.methods.sellerWallet().call(),
            presaleContract.methods.vnsToken().call()
        ]);
        
        const [usdtBalance, allowance, sellerWallet, vnsTokenAddress] = checks;
        
        if (BigInt(usdtBalance) < usdtAmount) {
            throw new Error("Insufficient USDT balance");
        }
        
        if (BigInt(allowance) < usdtAmount) {
            throw new Error("Insufficient USDT allowance");
        }
        
        const vnsTokenContract = new web3.eth.Contract(erc20ABI, vnsTokenAddress);
        const sellerBalance = await vnsTokenContract.methods.balanceOf(sellerWallet).call();
        
        if (BigInt(sellerBalance) < BigInt(vnsAmountWei)) {
            throw new Error("Seller has insufficient VNS tokens");
        }
        
        // 5. Execute purchase
        const tx = await presaleContract.methods.buyTokens(vnsAmountWei)
            .send({ from: accounts[0] });
            
        showTransactionStatus("Purchase successful!", "success");
        
        // Refresh data
        loadContractData();
    } catch (error) {
        console.error("Purchase error:", error);
        showTransactionStatus(`Purchase failed: ${error.message}`, "error");
    } finally {
        buyTokensBtn.disabled = false;
    }
}

// Show status messages
function showTransactionStatus(message, type) {
    transactionStatusDiv.textContent = message;
    transactionStatusDiv.className = '';
    transactionStatusDiv.classList.add(type);
}

// Initialize when page loads
window.addEventListener('load', init);
