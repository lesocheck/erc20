<!-- install dependencies  -->
npm i

<!-- edit environment variables -->
edit .env

<!-- compile contracts -->
npx hardhat compile

<!-- testing -->
npx hardhat test

<!-- deploy -->
npx hardhat run --network <network-name> scripts/deploy.ts

<!-- mint -->
npx hardhat mint --to YOUR_ADDRESS --amount AMOUNT_TO_MINT

<!-- approve -->
npx hardhat approve --spender SPENDER_ADDRESS --amount AMOUNT_TO_APPROVE

<!-- burn -->
npx hardhat burn --amount AMOUNT_TO_BURN


