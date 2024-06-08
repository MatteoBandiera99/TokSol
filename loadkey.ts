const loadedSecretKey = Uint8Array.from(JSON.parse(fs.readFileSync("secret-key.json")));
const loadedKeypair = Keypair.fromSecretKey(loadedSecretKey);
console.log ('Chiave pubblica caricata' , loadedKeypair.publicKey.toString());
