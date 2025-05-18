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

// Contract addresses 
const presaleContractAddress = "0x1d696372c231160765ea55294B545451560451b0"; 
const usdtTokenAddress = "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd"; 

class VNSPresaleApp {
    constructor() {
        this.web3 = null;
        this.accounts = [];
        this.presaleContract = null;
        this.usdtContract = null;
        this.vnsTokenContract = null;
        
        this.initElements();
        this.init();
    }

    initElements() {
        // Wallet elements
        this.connectWalletBtn = document.getElementById('connect-wallet');
        this.walletAddressSpan = document.getElementById('wallet-address');
        
        // Info display elements
        this.vnsAddressSpan = document.getElementById('vns-address');
        this.currentPriceSpan = document.getElementById('current-price');
        this.sellerBalanceSpan = document.getElementById('seller-balance');
        this.sellerApprovalSpan = document.getElementById('seller-approval');
        this.usdtBalanceSpan = document.getElementById('usdt-balance');
        this.usdtApprovalSpan = document.getElementById('usdt-approval');
        this.minPurchaseSpan = document.getElementById('min-purchase');
        
        // Input elements
        this.vnsAmountInput = document.getElementById('vns-amount');
        this.usdtEquivalentSpan = document.getElementById('usdt-equivalent');
        
        // Button elements
        this.approveUsdtBtn = document.getElementById('approve-usdt');
        this.buyTokensBtn = document.getElementById('buy-tokens');
        
        // Status element
        this.transactionStatusDiv = document.getElementById('transaction-status');
        
        // Copy buttons
        this.copyButtons = document.querySelectorAll('.copy-btn');
    }

    async init() {
        if (window.ethereum) {
            try {
                this.web3 = new Web3(window.ethereum);
                this.setupEventListeners();
                
                // Check if already connected
                this.accounts = await this.web3.eth.getAccounts();
                if (this.accounts.length > 0) {
                    await this.initializeContracts();
                    this.updateUI();
                }
            } catch (error) {
                console.error("Initialization error:", error);
                this.showTransactionStatus("Please connect your wallet", "error");
            }
        } else {
            this.showTransactionStatus("Please install MetaMask", "error");
        }
    }

    setupEventListeners() {
        this.connectWalletBtn.addEventListener('click', () => this.connectWallet());
        this.vnsAmountInput.addEventListener('input', () => this.updateUsdtEquivalent());
        this.approveUsdtBtn.addEventListener('click', () => this.approveUsdt());
        this.buyTokensBtn.addEventListener('click', () => this.buyTokens());
        
        this.copyButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleCopy(e));
        });

        window.ethereum.on('accountsChanged', (accounts) => this.handleAccountsChanged(accounts));
        window.ethereum.on('chainChanged', () => window.location.reload());
        window.ethereum.on('disconnect', () => this.handleDisconnect());
    }

    async connectWallet() {
        try {
            this.accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            await this.initializeContracts();
            this.updateUI();
            this.showTransactionStatus("Wallet connected successfully", "success");
        } catch (error) {
            console.error("Connection error:", error);
            this.showTransactionStatus("Wallet connection failed", "error");
        }
    }

    async initializeContracts() {
        try {
            this.presaleContract = new this.web3.eth.Contract(presaleABI, presaleContractAddress);
            this.usdtContract = new this.web3.eth.Contract(erc20ABI, usdtTokenAddress);
            
            // Initialize VNS token contract
            const vnsTokenAddress = await this.presaleContract.methods.vnsToken().call();
            this.vnsTokenContract = new this.web3.eth.Contract(erc20ABI, vnsTokenAddress);
            
            await this.loadContractData();
        } catch (error) {
            console.error("Contract initialization error:", error);
            throw error;
        }
    }

    async loadContractData() {
        try {
            if (!this.presaleContract || !this.usdtContract || !this.vnsTokenContract) {
                throw new Error("Contracts not initialized");
            }
            
            const [
                vnsTokenAddress,
                price,
                minPurchase,
                sellerWallet,
                isPaused,
                sellerBalance,
                sellerAllowance,
                usdtBalance,
                allowance
            ] = await Promise.all([
                this.presaleContract.methods.vnsToken().call(),
                this.presaleContract.methods.pricePerVNS().call(),
                this.presaleContract.methods.minPurchase().call(),
                this.presaleContract.methods.sellerWallet().call(),
                this.presaleContract.methods.isPaused().call(),
                this.vnsTokenContract.methods.balanceOf(sellerWallet).call(),
                this.vnsTokenContract.methods.allowance(sellerWallet, presaleContractAddress).call(),
                this.accounts.length > 0 ? this.usdtContract.methods.balanceOf(this.accounts[0]).call() : "0",
                this.accounts.length > 0 ? this.usdtContract.methods.allowance(this.accounts[0], presaleContractAddress).call() : "0"
            ]);
            
            // Update UI
            this.vnsAddressSpan.textContent = vnsTokenAddress + ' ';
            this.currentPriceSpan.textContent = `${this.web3.utils.fromWei(price, 'mwei')} USDT`;
            this.minPurchaseSpan.textContent = `${this.web3.utils.fromWei(minPurchase, 'mwei')} VNS`;
            this.sellerBalanceSpan.textContent = `${this.web3.utils.fromWei(sellerBalance, 'mwei')} VNS`;
            
            // Seller approval status
            const sellerApproval = this.web3.utils.fromWei(sellerAllowance, 'mwei');
            this.sellerApprovalSpan.textContent = `${sellerApproval} VNS`;
            this.sellerApprovalSpan.style.color = BigInt(sellerAllowance) > 0 ? "#2ecc71" : "#e74c3c";
            
            if (this.accounts.length > 0) {
                this.usdtBalanceSpan.textContent = `${this.web3.utils.fromWei(usdtBalance, 'ether')} USDT`;
                this.updateApprovalStatus(allowance);
            }
            
            if (isPaused) {
                this.showTransactionStatus("Presale is currently paused", "error");
            }
        } catch (error) {
            console.error("Error loading data:", error);
            this.showTransactionStatus("Error loading contract data", "error");
        }
    }

    updateApprovalStatus(allowance) {
        if (BigInt(allowance) > 0) {
            this.usdtApprovalSpan.textContent = "Approved";
            this.usdtApprovalSpan.style.color = "#2ecc71";
            this.approveUsdtBtn.disabled = true;
            this.buyTokensBtn.disabled = false;
        } else {
            this.usdtApprovalSpan.textContent = "Not Approved";
            this.usdtApprovalSpan.style.color = "#e74c3c";
            this.approveUsdtBtn.disabled = false;
            this.buyTokensBtn.disabled = true;
        }
    }

    updateUsdtEquivalent() {
        const vnsAmount = parseFloat(this.vnsAmountInput.value);
        if (!isNaN(vnsAmount) && vnsAmount > 0) {
            const priceText = this.currentPriceSpan.textContent.split(' ')[0];
            const price = parseFloat(priceText);
            
            if (!isNaN(price)) {
                const usdtEquivalent = (vnsAmount * price).toFixed(6);
                this.usdtEquivalentSpan.textContent = usdtEquivalent;
                
                if (this.usdtApprovalSpan.textContent === "Approved") {
                    this.buyTokensBtn.disabled = false;
                }
            }
        } else {
            this.usdtEquivalentSpan.textContent = '0';
            this.buyTokensBtn.disabled = true;
        }
    }

    async approveUsdt() {
        if (this.accounts.length === 0) return;
        
        try {
            this.showTransactionStatus("Approving USDT...", "info");
            this.approveUsdtBtn.disabled = true;
            
            const amountToApprove = this.web3.utils.toBN('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');
            
            const tx = await this.usdtContract.methods.approve(presaleContractAddress, amountToApprove)
                .send({ from: this.accounts[0] });
                
            this.showTransactionStatus("USDT successfully approved!", "success");
            
            // Update allowance status
            const allowance = await this.usdtContract.methods.allowance(this.accounts[0], presaleContractAddress).call();
            this.updateApprovalStatus(allowance);
        } catch (error) {
            console.error("Approval error:", error);
            this.showTransactionStatus(`Approval failed: ${error.message}`, "error");
            this.approveUsdtBtn.disabled = false;
        }
    }

    async buyTokens() {
        if (this.accounts.length === 0) return;
        
        const vnsAmount = parseFloat(this.vnsAmountInput.value);
        if (isNaN(vnsAmount) || vnsAmount <= 0) {
            this.showTransactionStatus("Please enter valid VNS amount", "error");
            return;
        }
        
        try {
            this.showTransactionStatus("Processing purchase...", "info");
            this.buyTokensBtn.disabled = true;
            
            // 1. Check contract pause status
            const isPaused = await this.presaleContract.methods.isPaused().call();
            if (isPaused) {
                throw new Error("Presale is currently paused");
            }
            
            // 2. Convert amount to wei (8 decimals)
            const vnsAmountWei = this.web3.utils.toWei(vnsAmount.toString(), 'mwei');
            
            // 3. Calculate required USDT
            const pricePerVNS = await this.presaleContract.methods.pricePerVNS().call();
            const usdtAmount = (BigInt(vnsAmountWei) * BigInt(pricePerVNS) / BigInt(10**8);
            
            // 4. Get seller wallet and check balances/allowances
            const sellerWallet = await this.presaleContract.methods.sellerWallet().call();
            
            const [
                usdtBalance,
                allowance,
                sellerBalance,
                sellerAllowance
            ] = await Promise.all([
                this.usdtContract.methods.balanceOf(this.accounts[0]).call(),
                this.usdtContract.methods.allowance(this.accounts[0], presaleContractAddress).call(),
                this.vnsTokenContract.methods.balanceOf(sellerWallet).call(),
                this.vnsTokenContract.methods.allowance(sellerWallet, presaleContractAddress).call()
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
            const tx = await this.presaleContract.methods.buyTokens(vnsAmountWei)
                .send({ from: this.accounts[0] });
                
            this.showTransactionStatus("Purchase successful!", "success");
            
            // Refresh data
            await this.loadContractData();
        } catch (error) {
            console.error("Purchase error:", error);
            this.showTransactionStatus(`Purchase failed: ${error.message}`, "error");
        } finally {
            this.buyTokensBtn.disabled = false;
        }
    }

    handleAccountsChanged(accounts) {
        this.accounts = accounts;
        this.updateUI();
        
        if (this.accounts.length > 0) {
            this.initializeContracts().catch(error => {
                console.error("Error after account change:", error);
            });
        } else {
            this.resetUI();
        }
    }

    handleDisconnect() {
        this.accounts = [];
        this.updateUI();
        this.resetUI();
    }

    updateUI() {
        if (this.accounts.length > 0) {
            this.connectWalletBtn.style.display = 'none';
            this.walletAddressSpan.textContent = `${this.accounts[0].substring(0, 6)}...${this.accounts[0].substring(38)}`;
            this.walletAddressSpan.style.display = 'inline-block';
        } else {
            this.connectWalletBtn.style.display = 'inline-block';
            this.walletAddressSpan.style.display = 'none';
        }
    }

    resetUI() {
        this.currentPriceSpan.textContent = 'Loading...';
        this.sellerBalanceSpan.textContent = 'Loading...';
        this.sellerApprovalSpan.textContent = 'Loading...';
        this.usdtBalanceSpan.textContent = '0.0';
        this.usdtApprovalSpan.textContent = 'Not Approved';
        this.usdtApprovalSpan.style.color = "#e74c3c";
        this.minPurchaseSpan.textContent = 'Loading...';
        this.approveUsdtBtn.disabled = true;
        this.buyTokensBtn.disabled = true;
    }

    showTransactionStatus(message, type) {
        this.transactionStatusDiv.textContent = message;
        this.transactionStatusDiv.className = '';
        this.transactionStatusDiv.classList.add(type);
    }

    handleCopy(e) {
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
}

// Initialize the app when page loads
window.addEventListener('load', () => {
    new VNSPresaleApp();
});
