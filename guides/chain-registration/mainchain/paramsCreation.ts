const { writeFileSync, fs } = require('fs-extra');
const { apiClient } = require('@liskhq/lisk-client');
const RPC_ENDPOINT = 'ws://142.93.230.246:4002/rpc-ws';
const { SC_CHAIN_ID, SC_NAME } = require('./constants.ts');

(async () => {

	const mainchainClient = await apiClient.createWSClient(RPC_ENDPOINT);
	const mainchainNodeInfo = await mainchainClient.invoke('system_getNodeInfo');
	// Get active validators from mainchain
	const {
		validators: mainchainActiveValidators,
		certificateThreshold: mainchainCertificateThreshold
	} = await mainchainClient.invoke('consensus_getBFTParameters', { height: mainchainNodeInfo.height });

	// Create Registration message parameters in JSON format
	// Update ownChainID and ownName to equal the sidechain ID and name that were registered on the mainchain
	const paramsJSON = {
		ownChainID: SC_CHAIN_ID,
		ownName: SC_NAME,
		mainchainValidators: mainchainActiveValidators.map(v => ({
			blsKey: v.blsKey,
			bftWeight: v.bftWeight
		})).sort((a, b) => Buffer.from(a.blsKey, 'hex').compare(Buffer.from(b.blsKey, 'hex'))),
		mainchainCertificateThreshold,
	};

	// Save params and params as JSON in a file params.json
	writeFileSync('./params.json',  JSON.stringify(paramsJSON));

	process.exit(0);
})();