const fs = require ('fs');

fs.writeFileSync("secret-key.json",
    JSON.stringify(Array.from(secretKey))
);
console.log("Chiave segreta salvata su secret-key.json");
