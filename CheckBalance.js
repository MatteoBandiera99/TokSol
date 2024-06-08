const { Connection, Keypair, LAMPORTS_PER_SOL, clusterApiUrl } = require('@solana/web3.js');
const fs = require('fs');

async function checkBalance() {
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

  const secretKey = Uint8Array.from(JSON.parse(fs.readFileSync('wallet.json')));
  const keypair = Keypair.fromSecretKey(secretKey);

  const balance = await connection.getBalance(keypair.publicKey);
  console.log('Saldo del wallet:', balance / LAMPORTS_PER_SOL, 'SOL');
}

checkBalance().catch(console.error);