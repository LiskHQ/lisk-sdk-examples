import { BaseAsset, ApplyAssetContext, codec, cryptography } from 'lisk-sdk';
import { createPostPropsSchema, CreatePostProps, postPropsSchema, PostboardAccountProps } from '../schemas';

const getIDForPost: (address: Buffer, nonce: bigint) => Buffer = function (
	a: Buffer,
	n: bigint
): Buffer {
	const nonceBuffer = Buffer.alloc(8);
	nonceBuffer.writeBigInt64LE(n);
	const seed = Buffer.concat([a, nonceBuffer]);
	return cryptography.hash(seed);
};

export class CreatePostAsset extends BaseAsset<CreatePostProps> {
	public name = 'createPost';
  public id = 0;

  // Define schema for asset
	public schema = createPostPropsSchema;


/*  public validate({ _asset }: ValidateAssetContext<{}>): void {
    // Validate your asset
  } */

	// eslint-disable-next-line @typescript-eslint/require-await
  public async apply({ asset, transaction, stateStore }: ApplyAssetContext<CreatePostProps>): Promise<void> {
		const sender = await stateStore.account.get<PostboardAccountProps>(transaction.senderAddress);
		const	postId = getIDForPost(transaction.senderAddress, transaction.nonce).toString('hex');

		const post = {
			id: postId,
			content: asset.message,
			date: Date.now(),
			author: sender.address,
			replies: [],
			likes: []
		};

		await stateStore.chain.set(postId, codec.encode(postPropsSchema, post));

		sender.post.posts.push(postId);
		await stateStore.account.set(sender.address, sender);
	}
}
