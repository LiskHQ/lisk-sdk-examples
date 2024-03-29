const cryptography = require('@liskhq/lisk-cryptography');
const fse = require('fs-extra');
const paramsJSON = require('./params.json');
const sidechainValidatorsSignatures = require('./sidechainValidatorsSignatures.json');

(async () => {
	const { bls } = cryptography;

  // Create BLS public keys list
	const publicKeysList = sidechainValidatorsSignatures.map(v => Buffer.from(v.publicKey,'hex'));
	const validatorsSignaturesBuffer = sidechainValidatorsSignatures.map(v => ({
		signature: Buffer.from(v.signature,'hex'),
		publicKey: Buffer.from(v.publicKey,'hex')
	}));


	// Create an aggregated signature & aggregation bits
	const { aggregationBits, signature } = bls.createAggSig(
		publicKeysList,
		validatorsSignaturesBuffer,
	);

	console.log('Result after creating aggregate signature:\n"aggregationBits": ', aggregationBits.toString('hex'), '\n"signature":', signature.toString('hex'));

	let	params = {
			ownChainID: Buffer.from(paramsJSON.ownChainID, 'hex'),
			ownName: paramsJSON.ownName,
			mainchainValidators: paramsJSON.mainchainValidators.map(v => ({
				blsKey: Buffer.from(v.blsKey, 'hex'),
				bftWeight: BigInt(v.bftWeight),
			})),
			mainchainCertificateThreshold: paramsJSON.mainchainCertificateThreshold.toString(),
		};

	// Sort validators from mainchain
	params.mainchainValidators.sort((a, b) => {
		a.blsKey.compare(b.blsKey);
	});

	console.log('Amount of signatures:', sidechainValidatorsSignatures.length);

	fse.writeFileSync('./mainchain_reg_params.json',  JSON.stringify({ ...paramsJSON, signature: signature.toString('hex'), aggregationBits: aggregationBits.toString('hex')}));

	console.log('Mainchain registration file is created at ./mainchain_reg_params.json successfully.');

	console.log(`Run below command to create transaction:\n "./bin/run transaction:create interoperability registerMainchain 20000000 --pretty -f ./mainchain_reg_params.json"`);

	// Now run transaction:create command
	/**
	 * 1. Run transaction:create command using the created params file
	 * CMD: ./bin/run transaction:create interoperability registerMainchain 20000000 --pretty -f ./mainchain_reg_params.json
	 * 2. Send or DryRun the transaction
	 * CMD: ./bin/run transaction:send <TX_HEX>
	 * 3. Call `chain_getEvents(height)` RPC for the block height the above transaction was included.
	 * 4. Call `chain_getBlockByHeight(height)` RPC to get the block in which the transaction was included.
	 * 5. Call `interoperability_getChainAccount(chainID)` RPC to get the mainchain account which was registered above.
	 */
	process.exit(0);
})();