const {
    Connection,
    Keypair,
    LAMPORTS_PER_SOL,
    clusterApiUrl,
    SystemProgram,
    Transaction,
    sendAndConfirmTransaction,
  } = require('@solana/web3.js');
  const fs = require('fs');
  
  async function createWallet() {

    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  
    const keypair = Keypair.generate();

    fs.writeFileSync('wallet.json', JSON.stringify(Array.from(keypair.secretKey)));
  
    console.log('Nuovo wallet creato');
    console.log('Indirizzo pubblico:', keypair.publicKey.toString());
  
    console.log('Richiesta di airdrop di 2 SOL');
    const airdropSignature = await connection.requestAirdrop(
      keypair.publicKey,
      2 * LAMPORTS_PER_SOL
    );
  
    await connection.confirmTransaction(airdropSignature);
  
    console.log('Airdrop completato -> Il wallet ha ricevuto 2 SOL');
  }
  
  async function checkBalance() {
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  
    const secretKey = Uint8Array.from(JSON.parse(fs.readFileSync('wallet.json')));
    const keypair = Keypair.fromSecretKey(secretKey);
  
    const balance = await connection.getBalance(keypair.publicKey);
    console.log('Saldo del wallet:', balance / LAMPORTS_PER_SOL, 'SOL');
  }
  
  createWallet().then(() => checkBalance()).catch(console.error);
  