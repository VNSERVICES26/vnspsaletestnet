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
                document.getElementById('walletAddress').innerText = this.accounts[0];
                await this.refreshData();
            }
        } catch (error) {
            console.error("Initialization Error:", error);
        }
    }

    async initWeb3() {
        if (window.ethereum) {
            this.web3 = new Web3(window.ethereum);
            this.accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        } else {
            alert("Please install MetaMask!");
        }
    }

    async initContracts() {
        this.presaleContract = new this.web3.eth.Contract(presaleABI, PRESALE_CONTRACT_ADDRESS);
        this.usdtContract = new this.web3.eth.Contract(erc20ABI, USDT_TOKEN_ADDRESS);

        const vnsAddress = await this.presaleContract.methods.vnsToken().call();
        this.vnsTokenContract = new this.web3.eth.Contract(erc20ABI, vnsAddress);
    }

    initElements() {
        document.getElementById('buyButton').addEventListener('click', () => this.buyTokens());
    }

    setupEventListeners() {
        this.presaleContract.events.TokensPurchased({}, (error, event) => {
            if (error) console.error("Event Error:", error);
            else {
                alert(`Purchase successful! ${event.returnValues.vnsAmount} VNS bought for ${event.returnValues.usdtAmount} USDT`);
                this.refreshData();
            }
        });

        window.ethereum.on('accountsChanged', async (accounts) => {
            this.accounts = accounts;
            document.getElementById('walletAddress').innerText = this.accounts[0];
            await this.refreshData();
        });
    }

    async refreshData() {
        const price = await this.presaleContract.methods.pricePerVNS().call();
        const min = await this.presaleContract.methods.minPurchase().call();

        document.getElementById('pricePerVNS').innerText = this.web3.utils.fromWei(price, 'ether') + " USDT";
        document.getElementById('minPurchase').innerText = min + " VNS";
    }

    async buyTokens() {
        const vnsAmount = document.getElementById('vnsAmountInput').value;
        if (!vnsAmount || isNaN(vnsAmount) || Number(vnsAmount) <= 0) {
            alert("Please enter a valid VNS amount.");
            return;
        }

        const price = await this.presaleContract.methods.pricePerVNS().call();
        const usdtAmount = this.web3.utils.toBN(price).mul(this.web3.utils.toBN(vnsAmount));

        // Approve USDT transfer
        await this.usdtContract.methods.approve(PRESALE_CONTRACT_ADDRESS, usdtAmount.toString())
            .send({ from: this.accounts[0] });

        // Call buyTokens
        await this.presaleContract.methods.buyTokens(vnsAmount).send({ from: this.accounts[0] });
    }
}
