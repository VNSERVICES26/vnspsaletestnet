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
const transactionStatusDiv = document.getElementById('transaction-status');
const copyButtons = document.querySelectorAll('.copy-btn');

// Initialize the application
async function init() {
    // Check if Web3 is injected
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        
        try {
            // Request account access
            accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setupEventListeners();
            updateUI();
            
            // Initialize contracts
            presaleContract = new web3.eth.Contract(presaleABI, presaleContractAddress);
            usdtContract = new web3.eth.Contract(erc20ABI, usdtTokenAddress);
            
            // Load contract data
            loadContractData();
        } catch (error) {
            console.error("User denied account access", error);
            showTransactionStatus("Please connect your wallet to continue", "error");
        }
    } else {
        console.log("No Web3 provider detected");
        showTransactionStatus("Please install MetaMask or another Web3 wallet", "error");
    }
}

// Set up event listeners
function setupEventListeners() {
    // Connect wallet button
    connectWalletBtn.addEventListener('click', async () => {
        if (accounts.length === 0) {
            try {
                accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                updateUI();
                loadContractData();
            } catch (error) {
                console.error("User denied account access", error);
                showTransactionStatus("Wallet connection failed", "error");
            }
        }
    });
    
    // VNS amount input
    vnsAmountInput.addEventListener('input', updateUsdtEquivalent);
    
    // Approve USDT button
    approveUsdtBtn.addEventListener('click', approveUsdt);
    
    // Buy tokens button
    buyTokensBtn.addEventListener('click', buyTokens);
    
    // Copy buttons
    copyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const textToCopy = e.target.closest('.copyable').textContent.trim().split(' ')[0];
            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    button.innerHTML = originalText;
                }, 2000);
            });
        });
    });
    
    // Handle account changes (using disconnect instead of close)
    window.ethereum.on('disconnect', () => {
        accounts = [];
        updateUI();
    });
    
    // Handle account changes
    window.ethereum.on('accountsChanged', (newAccounts) => {
        accounts = newAccounts;
        updateUI();
        loadContractData();
    });
    
    // Handle chain changes
    window.ethereum.on('chainChanged', () => {
        window.location.reload();
    });
}

// Update UI based on wallet connection
function updateUI() {
    if (accounts.length > 0) {
        connectWalletBtn.style.display = 'none';
        const shortAddress = `${accounts[0].substring(0, 6)}...${accounts[0].substring(38)}`;
        walletAddressSpan.textContent = shortAddress;
        walletAddressSpan.style.display = 'inline-block';
    } else {
        connectWalletBtn.style.display = 'inline-block';
        walletAddressSpan.style.display = 'none';
    }
}

// Load contract data
async function loadContractData() {
    try {
        // Get VNS token address from presale contract
        const vnsTokenAddress = await presaleContract.methods.vnsToken().call();
        vnsAddressSpan.textContent = vnsTokenAddress + ' ';
        
        // Get current price
        const price = await presaleContract.methods.pricePerVNS().call();
        const formattedPrice = web3.utils.fromWei(price, 'mwei'); // Using mwei because VNS has 8 decimals
        currentPriceSpan.textContent = `${formattedPrice} USDT`;
        
        // Get minimum purchase
        const minPurchase = await presaleContract.methods.minPurchase().call();
        minPurchaseSpan.textContent = `${web3.utils.fromWei(minPurchase, 'mwei')} VNS`;
        
        // Get seller VNS balance
        const sellerWalletAddress = await presaleContract.methods.sellerWallet().call();
        const vnsTokenContract = new web3.eth.Contract(erc20ABI, vnsTokenAddress);
        const sellerBalance = await vnsTokenContract.methods.balanceOf(sellerWalletAddress).call();
        sellerBalanceSpan.textContent = `${web3.utils.fromWei(sellerBalance, 'mwei')} VNS`;
        
        // Get user USDT balance
        if (accounts.length > 0) {
            const usdtBalance = await usdtContract.methods.balanceOf(accounts[0]).call();
            usdtBalanceSpan.textContent = `${web3.utils.fromWei(usdtBalance, 'ether')} USDT`;
            
            // Check USDT allowance
            const allowance = await usdtContract.methods.allowance(accounts[0], presaleContractAddress).call();
            if (allowance > 0) {
                approveUsdtBtn.disabled = true;
                buyTokensBtn.disabled = false;
            } else {
                approveUsdtBtn.disabled = false;
                buyTokensBtn.disabled = true;
            }
        }
    } catch (error) {
        console.error("Error loading contract data:", error);
        showTransactionStatus("Error loading contract data", "error");
    }
}

// Update USDT equivalent based on VNS amount
function updateUsdtEquivalent() {
    const vnsAmount = parseFloat(vnsAmountInput.value);
    if (!isNaN(vnsAmount) && vnsAmount > 0) {
        const priceText = currentPriceSpan.textContent.split(' ')[0];
        const price = parseFloat(priceText);
        
        if (!isNaN(price)) {
            // Calculate USDT amount considering decimals (VNS:8, USDT:18)
            const usdtEquivalent = (vnsAmount * price).toFixed(6);
            usdtEquivalentSpan.textContent = usdtEquivalent;
            
            // Enable/disable buttons based on input
            if (vnsAmount > 0) {
                if (approveUsdtBtn.disabled && !buyTokensBtn.disabled) {
                    buyTokensBtn.disabled = false;
                }
            } else {
                buyTokensBtn.disabled = true;
            }
        }
    } else {
        usdtEquivalentSpan.textContent = '0';
        buyTokensBtn.disabled = true;
    }
}

// Approve USDT spending
async function approveUsdt() {
    if (accounts.length === 0) return;
    
    try {
        showTransactionStatus("Approving USDT...", "info");
        approveUsdtBtn.disabled = true;
        
        // Calculate the amount to approve (approve max uint256)
        const amountToApprove = web3.utils.toBN('2').pow(web3.utils.toBN('256')).sub(web3.utils.toBN('1'));
        
        const tx = await usdtContract.methods.approve(presaleContractAddress, amountToApprove)
            .send({ from: accounts[0] });
            
        showTransactionStatus("USDT approval successful!", "success");
        approveUsdtBtn.disabled = true;
        buyTokensBtn.disabled = false;
        
        // Refresh allowance data
        loadContractData();
    } catch (error) {
        console.error("Error approving USDT:", error);
        showTransactionStatus("USDT approval failed: " + error.message, "error");
        approveUsdtBtn.disabled = false;
    }
}

// Buy VNS tokens
async function buyTokens() {
    if (accounts.length === 0) return;
    
    const vnsAmount = parseFloat(vnsAmountInput.value);
    if (isNaN(vnsAmount) || vnsAmount <= 0) {
        showTransactionStatus("Please enter a valid VNS amount", "error");
        return;
    }
    
    try {
        showTransactionStatus("Processing purchase...", "info");
        buyTokensBtn.disabled = true;
        
        // Convert VNS amount to the correct decimals (8)
        const vnsAmountWei = web3.utils.toWei(vnsAmount.toString(), 'mwei');
        
        const tx = await presaleContract.methods.buyTokens(vnsAmountWei)
            .send({ from: accounts[0] });
            
        showTransactionStatus("Purchase successful!", "success");
        
        // Refresh balances
        loadContractData();
    } catch (error) {
        console.error("Error buying tokens:", error);
        showTransactionStatus("Purchase failed: " + error.message, "error");
        buyTokensBtn.disabled = false;
    } finally {
        buyTokensBtn.disabled = false;
    }
}

// Show transaction status
function showTransactionStatus(message, type) {
    transactionStatusDiv.textContent = message;
    transactionStatusDiv.className = '';
    transactionStatusDiv.classList.add(type);
}

// Initialize the app when the page loads
window.addEventListener('load', init);
