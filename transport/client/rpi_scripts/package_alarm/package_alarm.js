const PIN = require("rpi-pins");
const GPIO = new PIN.GPIO();
// rpi-pins uses the WiringPi pin numbering system (check https://pinout.xyz/pinout/pin16_gpio23)
GPIO.setPin(4, PIN.MODE.INPUT);
const LightAlarmTransaction = require('../../../transactions/light-alarm');
const { EPOCH_TIME } = require('@liskhq/lisk-constants');
const { APIClient } = require('@liskhq/lisk-api-client');

const getTimestamp = () => {
    // check config file or curl localhost:4000/api/node/constants to verify your epoc time (OK when using /transport/node/index.js)
    const millisSinceEpoc = Date.now() - Date.parse(EPOCH_TIME);
    const inSeconds = ((millisSinceEpoc) / 1000).toFixed(0);
    return parseInt(inSeconds);
};

/* Note: Always update to the package you are using */
const packetCredentials = { address: '5090763841295658446L',
    passphrase:
        'that cost affair hungry brain coil tiger similar van notable hen soup',
    publicKey:
        'a206204c9eedabb190a1759be2b816eb0934a18ebee70d9c014d2a55842f88f3',
    privateKey:
        '5a2e6d7fc3996f800a7385e23e6243210193eeb73c83d4636d1aad157386a477a206204c9eedabb190a1759be2b816eb0934a18ebee70d9c014d2a55842f88f3' }

setInterval(() => {
	let state = GPIO.read(4);
	if(state === 1) {
		console.log('Package has been opened! Send lisk transaction!');
		console.log();
        let tx =  new LightAlarmTransaction({
            asset: {},
            fee: '0',
            recipientId: '10881167371402274308L', // dummy delegate_100 (receiver for package)
            timestamp: getTimestamp()
        });

        tx.sign(packetCredentials.passphrase); // Signed and send by package

        api.transactions.broadcast(tx.toJSON()).then(res => {
            console.log("++++++++++++++++ API Response +++++++++++++++++");
            console.log(res.data);
            console.log("++++++++++++++++ Transaction Payload +++++++++++++++++");
            console.log(tx.stringify());
            console.log("++++++++++++++++ End Script +++++++++++++++++");
        }).catch(err => {
            console.log(JSON.stringify(err.errors, null, 2));
        });
	} else {
		console.log('Alles gut');
	}
}, 500);