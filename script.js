// Contract ABIs (same as before)
const presaleABI = [{"inputs":[{"internalType":"address","name":"_vnsToken","type":"address"},{"internalType":"address","name":"_usdtToken","type":"address"},{"internalType":"address","name":"_sellerWallet","type":"address"},{"internalType":"address","name":"_paymentReceiver","type":"address"},{"internalType":"uint256","name":"_initialPrice","type":"uint256"},{"internalType":"uint256","name":"_minPurchase","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"buyer","type":"address"},{"indexed":false,"internalType":"uint256","name":"vnsAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"usdtAmount","type":"uint256"}],"name":"TokensPurchased","type":"event"},{"inputs":[{"internalType":"uint256","name":"vnsAmount","type":"uint256"}],"name":"buyTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"isPaused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minPurchase","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paymentReceiver","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pricePerVNS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sellerWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"newMin","type":"uint256"}],"name":"setMinPurchase","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newReceiver","type":"address"}],"name":"setPaymentReceiver","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"setPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newToken","type":"address"}],"name":"setVnsToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"usdtToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"vnsToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]; 
const erc20ABI = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"_decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];

// Replace these with your actual contract addresses
const PRESALE_CONTRACT_ADDRESS = "0x1d696372c231160765ea55294b545451560451b0"; 
const USDT_TOKEN_ADDRESS = "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd";     

class VNSPresaleApp {
    constructor() {
        this.initElements();
        this.init();
    }

    initElements() {
        this.connectWalletBtn = document.getElementById('connect-wallet');
        this.walletAddressSpan = document.getElementById('wallet-address');
        this.vnsAmountInput = document.getElementById('vns-amount');
        this.usdtEquivalentSpan = document.getElementById('usdt-equivalent');
        this.approveUsdtBtn = document.getElementById('approve-usdt');
        this.buyTokensBtn = document.getElementById('buy-tokens');
        this.currentPriceSpan = document.getElementById('current-price');
        this.sellerBalanceSpan = document.getElementById('seller-balance');
        this.sellerApprovalSpan = document.getElementById('seller-approval');
        this.usdtBalanceSpan = document.getElementById('usdt-balance');
        this.usdtApprovalSpan = document.getElementById('usdt-approval');
        this.minPurchaseSpan = document.getElementById('min-purchase');
        this.vnsAddressSpan = document.getElementById('vns-address');
        this.transactionStatusDiv = document.getElementById('transaction-status');
    }

    async init() {
        if (window.ethereum) {
            try {
                this.web3 = new Web3(window.ethereum);
                await this.setupEventListeners();
                
                // Check if wallet is already connected
                const accounts = await this.web3.eth.getAccounts();
                if (accounts.length > 0) {
                    this.accounts = accounts;
                    await this.initializeContracts();
                    this.updateUI();
                }
            } catch (error) {
                console.error("Initialization error:", error);
                this.showStatus("Initialization failed: " + error.message, "error");
            }
        } else {
            this.showStatus("Please install MetaMask", "error");
        }
    }

    async setupEventListeners() {
        this.connectWalletBtn.addEventListener('click', () => this.connectWallet());
        this.vnsAmountInput.addEventListener('input', () => this.updateUsdtEquivalent());
        this.approveUsdtBtn.addEventListener('click', () => this.approveUsdt());
        this.buyTokensBtn.addEventListener('click', () => this.buyTokens());

        // Handle wallet events
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts) => {
                this.accounts = accounts;
                if (accounts.length > 0) {
                    this.initializeContracts().then(() => this.updateUI());
                } else {
                    this.resetUI();
                }
            });
            
            window.ethereum.on('chainChanged', () => window.location.reload());
            window.ethereum.on('disconnect', () => this.handleDisconnect());
        }
    }

    async connectWallet() {
        try {
            this.accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            await this.initializeContracts();
            this.updateUI();
            this.showStatus("Wallet connected successfully", "success");
        } catch (error) {
            console.error("Connection error:", error);
            this.showStatus("Wallet connection failed: " + error.message, "error");
        }
    }

    async initializeContracts() {
        try {
            // Initialize contracts with checksum addresses
            const presaleAddress = this.web3.utils.toChecksumAddress(PRESALE_CONTRACT_ADDRESS);
            const usdtAddress = this.web3.utils.toChecksumAddress(USDT_TOKEN_ADDRESS);
            
            this.presaleContract = new this.web3.eth.Contract(presaleABI, presaleAddress);
            this.usdtContract = new this.web3.eth.Contract(erc20ABI, usdtAddress);
            
            // Get VNS token address from presale contract
            const vnsTokenAddress = await this.presaleContract.methods.vnsToken().call();
            const checksumVnsAddress = this.web3.utils.toChecksumAddress(vnsTokenAddress);
            this.vnsTokenContract = new this.web3.eth.Contract(erc20ABI, checksumVnsAddress);
            
            await this.loadContractData();
        } catch (error) {
            console.error("Contract initialization error:", error);
            throw error;
        }
    }

    async loadContractData() {
        try {
            const [
                price, minPurchase, sellerWallet, 
                isPaused, sellerBalance, sellerAllowance,
                usdtBalance, usdtAllowance
            ] = await Promise.all([
                this.presaleContract.methods.pricePerVNS().call(),
                this.presaleContract.methods.minPurchase().call(),
                this.presaleContract.methods.sellerWallet().call(),
                this.presaleContract.methods.isPaused().call(),
                this.vnsTokenContract.methods.balanceOf(await this.presaleContract.methods.sellerWallet().call()).call(),
                this.vnsTokenContract.methods.allowance(
                    await this.presaleContract.methods.sellerWallet().call(), 
                    this.presaleContract.options.address
                ).call(),
                this.accounts.length > 0 ? this.usdtContract.methods.balanceOf(this.accounts[0]).call() : "0",
                this.accounts.length > 0 ? this.usdtContract.methods.allowance(this.accounts[0], this.presaleContract.options.address).call() : "0"
            ]);

            // Update UI
            this.currentPriceSpan.textContent = `${this.web3.utils.fromWei(price, 'mwei')} USDT`;
            this.minPurchaseSpan.textContent = `${this.web3.utils.fromWei(minPurchase, 'mwei')} VNS`;
            this.sellerBalanceSpan.textContent = `${this.web3.utils.fromWei(sellerBalance, 'mwei')} VNS`;
            this.sellerApprovalSpan.textContent = `${this.web3.utils.fromWei(sellerAllowance, 'mwei')} VNS`;
            this.sellerApprovalSpan.style.color = BigInt(sellerAllowance) > 0 ? "#2ecc71" : "#e74c3c";
            
            if (this.accounts.length > 0) {
                this.usdtBalanceSpan.textContent = `${this.web3.utils.fromWei(usdtBalance, 'ether')} USDT`;
                this.updateApprovalStatus(usdtAllowance);
            }
            
            if (isPaused) {
                this.showStatus("Presale is currently paused", "error");
            }
        } catch (error) {
            console.error("Error loading data:", error);
            this.showStatus("Error loading contract data: " + error.message, "error");
        }
    }

    updateApprovalStatus(allowance) {
        const isApproved = BigInt(allowance) > 0;
        this.usdtApprovalSpan.textContent = isApproved ? "Approved" : "Not Approved";
        this.usdtApprovalSpan.style.color = isApproved ? "#2ecc71" : "#e74c3c";
        this.approveUsdtBtn.disabled = isApproved;
        this.buyTokensBtn.disabled = !isApproved;
    }

    updateUsdtEquivalent() {
        try {
            const vnsAmount = parseFloat(this.vnsAmountInput.value);
            if (!isNaN(vnsAmount) && vnsAmount > 0) {
                const price = parseFloat(this.currentPriceSpan.textContent.split(' ')[0]);
                const usdtEquivalent = (vnsAmount * price).toFixed(6);
                this.usdtEquivalentSpan.textContent = usdtEquivalent;
                this.buyTokensBtn.disabled = this.usdtApprovalSpan.textContent !== "Approved";
            } else {
                this.usdtEquivalentSpan.textContent = '0';
                this.buyTokensBtn.disabled = true;
            }
        } catch (error) {
            console.error("Calculation error:", error);
        }
    }

    async approveUsdt() {
        try {
            this.showStatus("Approving USDT...", "info");
            this.approveUsdtBtn.disabled = true;
            
            const tx = await this.usdtContract.methods.approve(
                this.presaleContract.options.address,
                this.web3.utils.toWei('1000000', 'ether') // Approve 1 million USDT
            ).send({ from: this.accounts[0] });
            
            this.showStatus("USDT approved successfully", "success");
            
            // Update allowance status
            const allowance = await this.usdtContract.methods.allowance(
                this.accounts[0], 
                this.presaleContract.options.address
            ).call();
            this.updateApprovalStatus(allowance);
        } catch (error) {
            console.error("Approval error:", error);
            this.showStatus("Approval failed: " + error.message, "error");
            this.approveUsdtBtn.disabled = false;
        }
    }

    async buyTokens() {
        try {
            const vnsAmount = parseFloat(this.vnsAmountInput.value);
            if (isNaN(vnsAmount) || vnsAmount <= 0) {
                throw new Error("Please enter a valid VNS amount");
            }
            
            this.showStatus("Processing purchase...", "info");
            this.buyTokensBtn.disabled = true;
            
            // Convert to wei (8 decimals)
            const vnsAmountWei = this.web3.utils.toWei(vnsAmount.toString(), 'mwei');
            
            const tx = await this.presaleContract.methods.buyTokens(vnsAmountWei)
                .send({ from: this.accounts[0] });
            
            this.showStatus("Purchase successful!", "success");
            
            // Refresh data
            await this.loadContractData();
        } catch (error) {
            console.error("Purchase error:", error);
            this.showStatus("Purchase failed: " + error.message, "error");
        } finally {
            this.buyTokensBtn.disabled = false;
        }
    }

    handleDisconnect() {
        this.accounts = [];
        this.resetUI();
        this.showStatus("Wallet disconnected", "info");
    }

    updateUI() {
        if (this.accounts.length > 0) {
            this.connectWalletBtn.style.display = 'none';
            const shortAddress = `${this.accounts[0].substring(0, 6)}...${this.accounts[0].substring(38)}`;
            this.walletAddressSpan.textContent = shortAddress;
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

    showStatus(message, type) {
        this.transactionStatusDiv.textContent = message;
        this.transactionStatusDiv.className = type;
        this.transactionStatusDiv.style.display = 'block';
    }
}

// Start the app when page loads
window.addEventListener('load', () => {
    new VNSPresaleApp();
});
