const { Keypair } = require("@solana/web3.js");
const keypair = Keypair.generate();

const publicKey = keypair.publicKey.toString();
const secretKey = keypair.secretKey;

console.log(`Ecco il tuo nuovo wallet: ${keypair.publicKey.toBase58()} [${keypair.secretKey}]`)

