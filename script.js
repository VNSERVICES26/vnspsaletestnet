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
let vnsTokenContract;

// DOM elements (same as before)

// Initialize the application
async function init() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        
        try {
            // Check if already connected
            accounts = await web3.eth.getAccounts();
            setupEventListeners();
            
            if (accounts.length > 0) {
                await initializeContracts();
                updateUI();
            }
        } catch (error) {
            console.error("Initialization error:", error);
            showTransactionStatus("Please connect your wallet", "error");
        }
    } else {
        showTransactionStatus("Please install MetaMask", "error");
    }
}

async function initializeContracts() {
    try {
        presaleContract = new web3.eth.Contract(presaleABI, presaleContractAddress);
        usdtContract = new web3.eth.Contract(erc20ABI, usdtTokenAddress);
        
        // Initialize VNS token contract
        const vnsTokenAddress = await presaleContract.methods.vnsToken().call();
        vnsTokenContract = new web3.eth.Contract(erc20ABI, vnsTokenAddress);
        
        await loadContractData();
    } catch (error) {
        console.error("Contract initialization error:", error);
        throw error;
    }
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
        await initializeContracts();
        updateUI();
    } catch (error) {
        console.error("Connection error:", error);
        showTransactionStatus("Wallet connection failed", "error");
    }
}

async function handleAccountsChanged(newAccounts) {
    accounts = newAccounts;
    updateUI();
    
    if (accounts.length > 0) {
        try {
            await initializeContracts();
        } catch (error) {
            console.error("Error after account change:", error);
        }
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

// ... (rest of the helper functions remain same as previous version)

async function loadContractData() {
    try {
        if (!presaleContract || !usdtContract || !vnsTokenContract) {
            throw new Error("Contracts not initialized");
        }
        
        // Load all data in parallel
        const [
            vnsTokenAddress,
            price,
            minPurchase,
            sellerWallet,
            isPaused,
            sellerBalance,
            usdtBalance,
            allowance,
            vnsAllowance
        ] = await Promise.all([
            presaleContract.methods.vnsToken().call(),
            presaleContract.methods.pricePerVNS().call(),
            presaleContract.methods.minPurchase().call(),
            presaleContract.methods.sellerWallet().call(),
            presaleContract.methods.isPaused().call(),
            vnsTokenContract.methods.balanceOf(sellerWallet).call(),
            accounts.length > 0 ? usdtContract.methods.balanceOf(accounts[0]).call() : "0",
            accounts.length > 0 ? usdtContract.methods.allowance(accounts[0], presaleContractAddress).call() : "0",
            accounts.length > 0 ? vnsTokenContract.methods.allowance(sellerWallet, presaleContractAddress).call() : "0"
        ]);
        
        // Update UI
        vnsAddressSpan.textContent = vnsTokenAddress + ' ';
        currentPriceSpan.textContent = `${web3.utils.fromWei(price, 'mwei')} USDT`;
        minPurchaseSpan.textContent = `${web3.utils.fromWei(minPurchase, 'mwei')} VNS`;
        sellerBalanceSpan.textContent = `${web3.utils.fromWei(sellerBalance, 'mwei')} VNS`;
        
        if (accounts.length > 0) {
            usdtBalanceSpan.textContent = `${web3.utils.fromWei(usdtBalance, 'ether')} USDT`;
            updateApprovalStatus(allowance);
            
            // Check seller's VNS allowance to presale contract
            const sellerVnsAllowance = web3.utils.fromWei(vnsAllowance, 'mwei');
            console.log("Seller VNS allowance to contract:", sellerVnsAllowance);
            
            if (BigInt(vnsAllowance) === 0n) {
                showTransactionStatus("Warning: Seller hasn't approved VNS transfer", "error");
            }
        }
        
        if (isPaused) {
            showTransactionStatus("Presale is currently paused", "error");
        }
    } catch (error) {
        console.error("Error loading data:", error);
        showTransactionStatus("Error loading contract data", "error");
    }
}

// ... (rest of the functions remain same as previous version)

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
        
        // 4. Get seller wallet and check allowances
        const sellerWallet = await presaleContract.methods.sellerWallet().call();
        
        const [
            usdtBalance,
            allowance,
            sellerBalance,
            sellerAllowance
        ] = await Promise.all([
            usdtContract.methods.balanceOf(accounts[0]).call(),
            usdtContract.methods.allowance(accounts[0], presaleContractAddress).call(),
            vnsTokenContract.methods.balanceOf(sellerWallet).call(),
            vnsTokenContract.methods.allowance(sellerWallet, presaleContractAddress).call()
        ]);
        
        // 5. Validate all conditions
        if (BigInt(usdtBalance) < usdtAmount) {
            throw new Error("Insufficient USDT balance");
        }
        
        if (BigInt(allowance) < usdtAmount) {
            throw new Error("Insufficient USDT allowance. Please approve USDT first.");
        }
        
        if (BigInt(sellerBalance) < BigInt(vnsAmountWei)) {
            throw new Error("Seller has insufficient VNS tokens");
        }
        
        if (BigInt(sellerAllowance) < BigInt(vnsAmountWei)) {
            throw new Error("Seller hasn't approved enough VNS for transfer");
        }
        
        // 6. Execute purchase
        const tx = await presaleContract.methods.buyTokens(vnsAmountWei)
            .send({ from: accounts[0] });
            
        showTransactionStatus("Purchase successful!", "success");
        
        // Refresh data
        await loadContractData();
    } catch (error) {
        console.error("Purchase error:", error);
        showTransactionStatus(`Purchase failed: ${error.message}`, "error");
    } finally {
        buyTokensBtn.disabled = false;
    }
}

window.addEventListener('load', init);
