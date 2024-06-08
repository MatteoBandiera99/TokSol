const web3 = require('@solana/web3.js');
const splToken = require('@solana/spl-token');

const connection = new web3.Connection(web3.clusterApiUrl('devnet'), 'confirmed');

async function createFungibleToken() {
    try {

        const mint = await splToken.Token.createMint(
            connection,
            new web3.Account(),
            web3.PublicKey.default, 
            null,
            0,
            web3.PublicKey.default, 
            web3.PublicKey.default 
        );

        console.log('Token mint address:', mint.publicKey.toBase58());

        const associatedTokenAddress = await splToken.Token.getAssociatedTokenAddress(
            splToken.ASSOCIATED_TOKEN_PROGRAM_ID,
            splToken.TOKEN_PROGRAM_ID,
            mint.publicKey,
            web3.PublicKey.default 
        );

        console.log('Associated token address:', associatedTokenAddress.toBase58());

      
        const ownerAccount = new web3.Account(); 
        await mint.mintTo(associatedTokenAddress, ownerAccount.publicKey, [], 1000000); 
        console.log('Token trasferiti all\'account associato')
        const associatedTokenAccount = await splToken.Token.getOrCreateAssociatedAccountInfo(
            connection,
            ownerAccount.publicKey,
            mint.publicKey
        );
        console.log('Saldo dell\'account associato:', associatedTokenAccount.amount.toNumber());
    } catch (error) {
        console.error('Errore durante la creazione del token:', error);
    }
}

createFungibleToken();