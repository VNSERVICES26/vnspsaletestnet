document.addEventListener('DOMContentLoaded', async () => {
    // Contract ABIs (same as before)
    const erc20Abi = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"_decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];

    const presaleAbi = [{"inputs":[{"internalType":"address","name":"_vnsToken","type":"address"},{"internalType":"address","name":"_usdtToken","type":"address"},{"internalType":"address","name":"_sellerWallet","type":"address"},{"internalType":"address","name":"_paymentReceiver","type":"address"},{"internalType":"uint256","name":"_initialPrice","type":"uint256"},{"internalType":"uint256","name":"_minPurchase","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"buyer","type":"address"},{"indexed":false,"internalType":"uint256","name":"vnsAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"usdtAmount","type":"uint256"}],"name":"TokensPurchased","type":"event"},{"inputs":[{"internalType":"uint256","name":"vnsAmount","type":"uint256"}],"name":"buyTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"isPaused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minPurchase","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paymentReceiver","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pricePerVNS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sellerWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"newMin","type":"uint256"}],"name":"setMinPurchase","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newReceiver","type":"address"}],"name":"setPaymentReceiver","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"setPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newToken","type":"address"}],"name":"setVnsToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"usdtToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"vnsToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}];

    const presaleAddress = "0x1d696372c231160765ea55294B545451560451b0"; 
    const vnsTokenAddress = "0xD56b19A7A083E64b3f2E41cDD09BaDF2D168D101"; 
    const usdtTokenAddress = "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd"; 

    let web3;
    let accounts = [];
    let presaleContract;
    let vnsTokenContract;
    let usdtTokenContract;
    let vnsDecimals = 8; // Updated to 8 for VNS
    let usdtDecimals = 18; // USDT remains 18

    // ... (all DOM element declarations remain the same)

    // Initialize contracts
    async function initContracts() {
        presaleContract = new web3.eth.Contract(presaleAbi, presaleAddress);
        vnsTokenContract = new web3.eth.Contract(erc20Abi, vnsTokenAddress);
        usdtTokenContract = new web3.eth.Contract(erc20Abi, usdtTokenAddress);

        // Get token decimals (with fallback to our known values)
        try {
            vnsDecimals = await vnsTokenContract.methods.decimals().call() || 8;
            usdtDecimals = await usdtTokenContract.methods.decimals().call() || 18;
        } catch (error) {
            console.error("Error getting token decimals:", error);
            // Use our known values if there's an error
            vnsDecimals = 8;
            usdtDecimals = 18;
        }
    }

    // Calculate USDT equivalent for VNS amount (updated for decimals)
    function calculateUsdtEquivalent() {
        const vnsAmount = parseFloat(vnsAmountInput.value) || 0;
        presaleContract.methods.pricePerVNS().call()
            .then(price => {
                // Convert VNS amount to smallest units (8 decimals)
                const vnsAmountInUnits = vnsAmount * (10 ** vnsDecimals);
                
                // Calculate USDT amount (price is in 1e8 units per VNS)
                const usdtAmount = (vnsAmountInUnits * price) / (10 ** (8 + usdtDecimals));
                
                usdtEquivalentSpan.textContent = usdtAmount.toFixed(6);
            })
            .catch(error => {
                console.error("Error calculating USDT equivalent:", error);
            });
    }

    // Approve USDT for spending (updated for decimals)
    async function approveUsdt() {
        if (!accounts.length) {
            showTransactionStatus('Please connect your wallet first', 'error');
            return;
        }

        const vnsAmount = parseFloat(vnsAmountInput.value);
        if (isNaN(vnsAmount)) {
            showTransactionStatus('Please enter a valid VNS amount', 'error');
            return;
        }

        try {
            const price = await presaleContract.methods.pricePerVNS().call();
            // Convert VNS amount to smallest units (8 decimals)
            const vnsAmountInUnits = vnsAmount * (10 ** vnsDecimals);
            // Calculate USDT amount in smallest units (18 decimals)
            const usdtAmountInUnits = (vnsAmountInUnits * price) / (10 ** 8);

            showTransactionStatus('Approving USDT...', 'info');

            await usdtTokenContract.methods.approve(
                presaleAddress,
                usdtAmountInUnits.toString()
            ).send({ from: accounts[0] });

            showTransactionStatus('USDT approved successfully!', 'success');
            updateUI();
        } catch (error) {
            console.error("Error approving USDT:", error);
            showTransactionStatus('Error approving USDT: ' + error.message, 'error');
        }
    }

    // Buy VNS tokens (updated for decimals)
    async function buyVns() {
        if (!accounts.length) {
            showTransactionStatus('Please connect your wallet first', 'error');
            return;
        }

        const vnsAmount = parseFloat(vnsAmountInput.value);
        if (isNaN(vnsAmount) || vnsAmount <= 0) {
            showTransactionStatus('Please enter a valid VNS amount', 'error');
            return;
        }

        const minPurchase = await presaleContract.methods.minPurchase().call();
        const minPurchaseFormatted = minPurchase / (10 ** vnsDecimals);
        
        if (vnsAmount < minPurchaseFormatted) {
            showTransactionStatus(`Minimum purchase is ${minPurchaseFormatted} VNS`, 'error');
            return;
        }

        try {
            showTransactionStatus('Processing transaction...', 'info');

            // Convert VNS amount to smallest units (8 decimals)
            const vnsAmountInUnits = (vnsAmount * (10 ** vnsDecimals)).toString();
            
            await presaleContract.methods.buyTokens(vnsAmountInUnits).send({ from: accounts[0] });

            showTransactionStatus('VNS tokens purchased successfully!', 'success');
            updateUI();
        } catch (error) {
            console.error("Error buying VNS:", error);
            showTransactionStatus('Error buying VNS: ' + error.message, 'error');
        }
    }

    // Update UI with contract data (updated for decimals)
    async function updateUI() {
        if (!accounts.length) {
            walletAddressSpan.style.display = 'none';
            return;
        }

        // Display wallet address (shortened)
        const shortAddress = `${accounts[0].substring(0, 6)}...${accounts[0].substring(38)}`;
        walletAddressSpan.textContent = shortAddress;
        walletAddressSpan.style.display = 'inline-block';

        try {
            // Get presale contract data
            const price = await presaleContract.methods.pricePerVNS().call();
            const minPurchase = await presaleContract.methods.minPurchase().call();
            const isPaused = await presaleContract.methods.isPaused().call();
            const sellerWallet = await presaleContract.methods.sellerWallet().call();
            
            // Get token balances
            const userUsdtBalance = await usdtTokenContract.methods.balanceOf(accounts[0]).call();
            const userVnsBalance = await vnsTokenContract.methods.balanceOf(accounts[0]).call();
            const sellerVnsBalance = await vnsTokenContract.methods.balanceOf(sellerWallet).call();
            const usdtAllowance = await usdtTokenContract.methods.allowance(accounts[0], presaleAddress).call();
            
            // Format balances with correct decimals
            const formatBalance = (balance, decimals) => {
                return (balance / (10 ** decimals)).toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: decimals
                });
            };
            
            // Update UI with formatted values
            pricePerVnsSpan.textContent = `${(price / (10 ** 8)).toFixed(8)} USDT`;
            minPurchaseSpan.textContent = `${formatBalance(minPurchase, vnsDecimals)} VNS`;
            sellerBalanceSpan.textContent = `${formatBalance(sellerVnsBalance, vnsDecimals)} VNS`;
            contractStatusSpan.textContent = isPaused ? 'Paused' : 'Active';
            contractStatusSpan.style.color = isPaused ? 'red' : 'green';
            
            userUsdtBalanceSpan.textContent = `${formatBalance(userUsdtBalance, usdtDecimals)} USDT`;
            userVnsBalanceSpan.textContent = `${formatBalance(userVnsBalance, vnsDecimals)} VNS`;
            usdtAllowanceSpan.textContent = `${formatBalance(usdtAllowance, usdtDecimals)} USDT`;
            
            // Update contract addresses
            vnsAddressSpan.textContent = vnsTokenAddress;
            usdtAddressSpan.textContent = usdtTokenAddress;
            presaleAddressSpan.textContent = presaleAddress;
            
            // Enable/disable buttons based on allowance
            const vnsAmount = parseFloat(vnsAmountInput.value) || 0;
            const vnsAmountInUnits = vnsAmount * (10 ** vnsDecimals);
            const requiredUsdtInUnits = (vnsAmountInUnits * price) / (10 ** 8);
            
            if (parseInt(usdtAllowance) >= parseInt(requiredUsdtInUnits) && vnsAmount > 0) {
                approveUsdtBtn.disabled = true;
                buyVnsBtn.disabled = false;
            } else {
                approveUsdtBtn.disabled = false;
                buyVnsBtn.disabled = true;
            }
        } catch (error) {
            console.error("Error updating UI:", error);
        }
    }

    // ... (rest of the code remains the same)
    // Initialize the app
    initWeb3();
});
