/* eslint-disable class-methods-use-this */

import {
	BaseModule,
	BlockAfterExecuteContext,
	BlockExecuteContext,
	BlockVerifyContext,
	GenesisBlockExecuteContext,
	InsertAssetContext,
	ModuleInitArgs,
	ModuleMetadata,
	TransactionExecuteContext,
	TransactionVerifyContext,
	VerificationResult,
	utils,
} from 'lisk-sdk';
import { validator } from '@liskhq/lisk-validator';
import { CreateHelloCommand } from './commands/create_hello_command';
import {
	configSchema,
	getHelloRequestSchema,
	getHelloCounterResponseSchema,
	getHelloResponseSchema,
} from './schema';
import { ModuleConfigJSON } from './types';
import { HelloEndpoint } from './endpoint';
import { NewHelloEvent } from './events/new_hello';
import { HelloMethod } from './method';
import { CounterStore } from './stores/counter';
import { MessageStore } from './stores/message';

export const defaultConfig = {
	maxMessageLength: 256,
	minMessageLength: 3,
	blacklist: ['illegalWord1'],
};

export class HelloModule extends BaseModule {
	public constructor() {
		super();
		// registration of stores and events
		this.stores.register(CounterStore, new CounterStore(this.name, 0));
		this.stores.register(MessageStore, new MessageStore(this.name, 1));
		this.events.register(NewHelloEvent, new NewHelloEvent(this.name));
	}

	public metadata(): ModuleMetadata {
		return {
			endpoints: [
				{
					name: this.endpoint.getHello.name,
					request: getHelloRequestSchema,
					response: getHelloResponseSchema,
				},
				{
					name: this.endpoint.getHelloCounter.name,
					response: getHelloCounterResponseSchema,
				},
			],
			commands: this.commands.map(command => ({
				name: command.name,
				params: command.schema,
			})),
			events: this.events.values().map(v => ({
				name: v.name,
				data: v.schema,
			})),
			assets: [],
			stores: [],
		};
	}

	// Lifecycle hooks
	// eslint-disable-next-line @typescript-eslint/require-await
	public async init(args: ModuleInitArgs): Promise<void> {
		// Get the module config defined in the config.json file
		const { moduleConfig } = args;
		// Overwrite the default module config with values from config.json, if set
		const config = utils.objects.mergeDeep({}, defaultConfig, moduleConfig) as ModuleConfigJSON;
		// Validate the provided config with the config schema
		validator.validate<ModuleConfigJSON>(configSchema, config);
		// Call the command init() method with config values as parameters
		this.commands[0].init(config).catch(err => {
			// eslint-disable-next-line no-console
			console.log('Error: ', err);
		});
	}

	public async insertAssets(_context: InsertAssetContext) {
		// initialize block generation, add asset
	}

	public async verifyAssets(_context: BlockVerifyContext): Promise<void> {
		// verify block
	}

	// Lifecycle hooks
	// eslint-disable-next-line @typescript-eslint/require-await
	public async verifyTransaction(context: TransactionVerifyContext): Promise<VerificationResult> {
		// verify transaction will be called multiple times in the transaction pool
		context.logger.info('TX VERIFICATION');
		const result = {
			status: 1,
		};
		return result;
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	public async beforeCommandExecute(_context: TransactionExecuteContext): Promise<void> {}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	public async afterCommandExecute(_context: TransactionExecuteContext): Promise<void> {}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	public async initGenesisState(_context: GenesisBlockExecuteContext): Promise<void> {}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	public async finalizeGenesisState(_context: GenesisBlockExecuteContext): Promise<void> {}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	public async beforeTransactionsExecute(_context: BlockExecuteContext): Promise<void> {}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	public async afterTransactionsExecute(_context: BlockAfterExecuteContext): Promise<void> {}

	public endpoint = new HelloEndpoint(this.stores, this.offchainStores);
	public method = new HelloMethod(this.stores, this.events);
	public commands = [new CreateHelloCommand(this.stores, this.events)];
}
