const { writeFileSync } = require('fs-extra');
const { apiClient } = require('@liskhq/lisk-client');

(async () => {

    let name;
    let chainID;
    let threshold;

    process.argv.forEach(function (val, index, array) {
        if (index === 2) {
            name = val;
        } else if (index === 3) {
            chainID = val;
        } else if (index === 4) {
            threshold = val;
        }
    });

    const sidechainClient = await apiClient.createIPCClient('~/.lisk/sidechain');

    const sidechainNodeInfo = await sidechainClient.invoke('system_getNodeInfo');

    // Get active validators from sidechain
    const { validators: sidehcainActiveValidators } = await sidechainClient.invoke('consensus_getBFTParameters', { height: sidechainNodeInfo.height });

    // Sort active validators from sidechain
    sidehcainActiveValidators.sort((a, b) => a.blsKey.localeCompare(b.blsKey));

    const scReg = {
        "chainID": chainID.toString(),
        "name": name,
        "sidechainValidators": sidehcainActiveValidators,
        "sidechainCertificateThreshold": threshold.toString()
    };

    return scReg;
})().then((res) => {
    //console.log(res);
    writeFileSync('./sidechain_reg_params.json',  JSON.stringify(res));
});