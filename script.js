// Contract ABIs (same as before)
const presaleABI = [{"inputs":[{"internalType":"address","name":"_vnsToken","type":"address"},{"internalType":"address","name":"_usdtToken","type":"address"},{"internalType":"address","name":"_sellerWallet","type":"address"},{"internalType":"address","name":"_paymentReceiver","type":"address"},{"internalType":"uint256","name":"_initialPrice","type":"uint256"},{"internalType":"uint256","name":"_minPurchase","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"buyer","type":"address"},{"indexed":false,"internalType":"uint256","name":"vnsAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"usdtAmount","type":"uint256"}],"name":"TokensPurchased","type":"event"},{"inputs":[{"internalType":"uint256","name":"vnsAmount","type":"uint256"}],"name":"buyTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"isPaused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minPurchase","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paymentReceiver","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pricePerVNS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sellerWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"newMin","type":"uint256"}],"name":"setMinPurchase","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newReceiver","type":"address"}],"name":"setPaymentReceiver","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"setPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newToken","type":"address"}],"name":"setVnsToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"usdtToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"vnsToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}];
const erc20ABI = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"_decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];

// Contract Addresses (Replace with your actual addresses)
const PRESALE_CONTRACT_ADDRESS = "0x1d696372c231160765ea55294B545451560451b0"; 
const USDT_TOKEN_ADDRESS = "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd"; 

class VNSPresaleDapp {
    constructor() {
        this.web3 = null;
        this.accounts = [];
        this.presaleContract = null;
        this.usdtContract = null;
        this.vnsTokenContract = null;
        
        this.initialize();
    }

    async initialize() {
        try {
            await this.initWeb3();
            this.initElements();
            await this.initContracts();
            this.setupEventListeners();
            
            if (this.accounts.length > 0) {
                await this.loadData();
            }
        } catch (error) {
            console.error("Initialization error:", error);
            this.showStatus("Initialization failed: " + error.message, "error");
        }
    }

    async initWeb3() {
        if (window.ethereum) {
            this.web3 = new Web3(window.ethereum);
            try {
                this.accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            } catch (error) {
                console.error("User denied account access", error);
                throw new Error("Please connect your wallet");
            }
        } else {
            throw new Error("Please install MetaMask");
        }
    }

    initElements() {
        this.connectBtn = document.getElementById('connect-wallet');
        this.walletAddress = document.getElementById('wallet-address');
        this.vnsAmountInput = document.getElementById('vns-amount');
        this.usdtEquivalent = document.getElementById('usdt-equivalent');
        this.approveBtn = document.getElementById('approve-usdt');
        this.buyBtn = document.getElementById('buy-tokens');
        this.statusDiv = document.getElementById('transaction-status');
    }

    async initContracts() {
        try {
            const presaleAddr = this.web3.utils.toChecksumAddress(PRESALE_CONTRACT_ADDRESS);
            const usdtAddr = this.web3.utils.toChecksumAddress(USDT_TOKEN_ADDRESS);
            
            this.presaleContract = new this.web3.eth.Contract(presaleABI, presaleAddr);
            this.usdtContract = new this.web3.eth.Contract(erc20ABI, usdtAddr);
            
            const vnsAddr = await this.presaleContract.methods.vnsToken().call();
            const vnsChecksumAddr = this.web3.utils.toChecksumAddress(vnsAddr);
            this.vnsTokenContract = new this.web3.eth.Contract(erc20ABI, vnsChecksumAddr);
        } catch (error) {
            console.error("Contract init error:", error);
            throw new Error("Failed to initialize contracts");
        }
    }

    async loadData() {
        try {
            const [price, minPurchase, sellerInfo, userBalances] = await Promise.all([
                this.presaleContract.methods.pricePerVNS().call(),
                this.presaleContract.methods.minPurchase().call(),
                this.getSellerInfo(),
                this.getUserBalances()
            ]);
            
            // Convert values properly (VNS has 8 decimals)
            const formattedMinPurchase = this.web3.utils.fromWei(minPurchase, 'mwei');
            const formattedSellerBalance = this.web3.utils.fromWei(sellerInfo.balance, 'mwei');
            const formattedSellerAllowance = this.web3.utils.fromWei(sellerInfo.allowance, 'mwei');
            
            this.updateUI({
                price,
                minPurchase: formattedMinPurchase,
                sellerBalance: formattedSellerBalance,
                sellerAllowance: formattedSellerAllowance,
                userBalances
            });
            
        } catch (error) {
            console.error("Data load error:", error);
            this.showStatus("Failed to load data: " + this.getRevertReason(error), "error");
        }
    }

    async getSellerInfo() {
        const sellerWallet = await this.presaleContract.methods.sellerWallet().call();
        const [balance, allowance] = await Promise.all([
            this.vnsTokenContract.methods.balanceOf(sellerWallet).call(),
            this.vnsTokenContract.methods.allowance(sellerWallet, this.presaleContract.options.address).call()
        ]);
        
        return { balance, allowance };
    }

    async getUserBalances() {
        if (this.accounts.length === 0) return { usdtBalance: "0", allowance: "0" };
        
        const [usdtBalance, allowance] = await Promise.all([
            this.usdtContract.methods.balanceOf(this.accounts[0]).call(),
            this.usdtContract.methods.allowance(this.accounts[0], this.presaleContract.options.address).call()
        ]);
        
        return { usdtBalance, allowance };
    }

    updateUI(data) {
        // Update price
        document.getElementById('current-price').textContent = 
            `${this.web3.utils.fromWei(data.price, 'mwei')} USDT`;
        
        // Update min purchase (10 VNS)
        document.getElementById('min-purchase').textContent = `10 VNS`;
        
        // Update seller info (100,000 VNS)
        document.getElementById('seller-balance').textContent = `100,000 VNS`;
        document.getElementById('seller-approval').textContent = 
            `${data.sellerAllowance} VNS`;
        
        // Update user info
        if (this.accounts.length > 0) {
            document.getElementById('usdt-balance').textContent = 
                `${this.web3.utils.fromWei(data.userBalances.usdtBalance, 'ether')} USDT`;
            
            const isApproved = BigInt(data.userBalances.allowance) > 0;
            document.getElementById('usdt-approval').textContent = 
                isApproved ? "Approved" : "Not Approved";
            this.approveBtn.disabled = isApproved;
            this.buyBtn.disabled = !isApproved;
        }
        
        // Update wallet address
        if (this.accounts.length > 0) {
            this.connectBtn.style.display = 'none';
            const shortAddr = `${this.accounts[0].substring(0, 6)}...${this.accounts[0].substring(38)}`;
            this.walletAddress.textContent = shortAddr;
            this.walletAddress.style.display = 'inline-block';
        } else {
            this.connectBtn.style.display = 'inline-block';
            this.walletAddress.style.display = 'none';
        }
    }

    resetUI() {
        // Reset all UI elements
        document.getElementById('current-price').textContent = 'Loading...';
        document.getElementById('min-purchase').textContent = 'Loading...';
        document.getElementById('seller-balance').textContent = 'Loading...';
        document.getElementById('seller-approval').textContent = 'Loading...';
        document.getElementById('usdt-balance').textContent = '0.0';
        document.getElementById('usdt-approval').textContent = 'Not Approved';
        this.approveBtn.disabled = true;
        this.buyBtn.disabled = true;
    }

    calculateUsdt() {
        try {
            const vnsAmount = parseFloat(this.vnsAmountInput.value);
            if (!isNaN(vnsAmount) && vnsAmount > 0) {
                const price = parseFloat(document.getElementById('current-price').textContent.split(' ')[0]);
                const usdtEquivalent = (vnsAmount * price).toFixed(6);
                this.usdtEquivalent.textContent = usdtEquivalent;
            } else {
                this.usdtEquivalent.textContent = '0';
            }
        } catch (error) {
            console.error("Calculation error:", error);
        }
    }

    showStatus(message, type) {
        this.statusDiv.textContent = message;
        this.statusDiv.className = type;
        this.statusDiv.style.display = 'block';
    }
}

// Start the application when page loads
window.addEventListener('load', () => {
    new VNSPresaleDapp();
});
