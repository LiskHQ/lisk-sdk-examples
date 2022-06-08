export interface PostboardAccountProps {
	address: Buffer;
	keys: {
		mandatoryKeys: Buffer[];
		numberOfSignatures: string;
		optionalKeys: Buffer[];
	};
	sequence: {
		nonce: string;
	};
	token: {
		balance: string;
	};
	post: {
		following: Buffer[];
		followers: Buffer[];
		posts: string[];
		replies: string[];
		likes: string[];
	};
}

export const postboardAccountPropsSchema = {
	type: 'object',
	properties: {
		following: {
			fieldNumber: 1,
			type: 'array',
			items: {
				dataType: 'bytes',
			}
		},
		followers: {
			fieldNumber: 2,
			type: 'array',
			items: {
				dataType: 'bytes',
			}
		},
		posts: {
			fieldNumber: 3,
			type: 'array',
			items: {
				dataType: 'string',
			}
		},
		replies: {
			fieldNumber: 4,
			type: 'array',
			items: {
				dataType: 'string',
			}
		},
		likes: {
			fieldNumber: 5,
			type: 'array',
			items: {
				dataType: 'string',
			}
		}
	},
	default: {
		followers: [],
		following: [],
		posts: [],
		replies: [],
		likes: []
	},
};

export interface CreatePostProps {
	message: string;
}

export const createPostPropsSchema = {
	$id: 'post/createPost-asset',
	title: 'CreatePostAsset transaction asset for post module',
	type: 'object',
	required: ['message'],
	properties: {
		message: {
			dataType: 'string',
			fieldNumber: 1,
			minLength: 3,
			maxLength: 256,
		}
	}
};

export interface RepostProps {
	postId: string;
}

export const repostPropsSchema = {
	$id: 'post/repost-asset',
	title: 'Repost transaction asset for post module',
	type: 'object',
	required: ['postId'],
	properties: {
		postId: {
			dataType: 'string',
			fieldNumber: 1,
		}
	}
}

export interface ReplyProps {
	postId: string;
	content: string;
}

export const replyPropsSchema = {
	$id: 'post/reply-asset',
	title: 'Reply transaction asset for post module',
	type: 'object',
	required: ['postId', 'content'],
	properties: {
		postId: {
			dataType: 'string',
			fieldNumber: 1,
		},
		content: {
			dataType: 'string',
			fieldNumber: 2,
			minLength: 3,
			maxLength: 256
		}
	}
}

export interface LikeProps {
	postId: string;
}

export const likePropsSchema = {
	$id: 'post/like-asset',
	title: 'Like transaction asset for post module',
	type: 'object',
	required: ['postId'],
	properties: {
		postId: {
			dataType: 'string',
			fieldNumber: 1,
		}
	}
}

export interface FollowProps {
	account: string;
}

export const followPropsSchema = {
	$id: 'post/follow-asset',
	title: 'Follow transaction asset for post module',
	type: 'object',
	required: ['account'],
	properties: {
		account: {
			dataType: 'string',
			fieldNumber: 1,
		}
	}
}

export interface PostProps {
	id: string;
	content: string;
	date: number;
	author: Buffer;
	replies: {
		author: Buffer;
		date: number;
		content: string;
	}[];
	reposts: Buffer[];
	likes: Buffer[];
}

export interface StringProps {
	id: string;
	content: string;
	date: number;
	author: string;
	replies: {
		author: string;
		date: number;
		content: string;
	}[];
	reposts: string[];
	likes: string[];
}

export const postPropsSchema = {
	$id: 'post/posts',
	title: 'CreatePostAsset transaction asset for post module',
	type: 'object',
	required: ['content','date','author'],
	properties: {
		content: {
			dataType: 'string',
			fieldNumber: 1,
			minLength: 3,
			maxLength: 256,
		},
		date: {
			dataType: 'uint32',
			fieldNumber: 2,
		},
		author: {
			dataType: 'bytes',
			fieldNumber: 3,
		},
		reposts: {
			type: 'array',
			fieldNumber: 4,
			items: {
				dataType: 'bytes',
			},
		},
		replies: {
			type: 'array',
			fieldNumber: 5,
			items: {
				type: 'object',
				properties: {
					author: {
						fieldNumber: 1,
						dataType: 'bytes',
					},
					date: {
						dataType: 'uint32',
						fieldNumber: 2,
					},
					content: {
						fieldNumber: 3,
						dataType: 'string',
					},
				},
			},
		},
		likes: {
			type: 'array',
			fieldNumber: 6,
			items: {
				dataType: 'bytes',
			},
		}
	}
};

export const accountSchema = {
	$id: '/account/base',
	properties: {
		address: {
			dataType: 'bytes',
			fieldNumber: 1,
		},
		keys: {
			fieldNumber: 4,
			properties: {
				mandatoryKeys: {
					fieldNumber: 2,
					items: {
						dataType: 'bytes',
					},
					type: 'array',
				},
				numberOfSignatures: {
					dataType: 'uint32',
					fieldNumber: 1,
				},
				optionalKeys: {
					fieldNumber: 3,
					items: {
						dataType: 'bytes',
					},
					type: 'array',
				},
			},
			type: 'object',
		},
		sequence: {
			fieldNumber: 3,
			properties: {
				nonce: {
					dataType: 'uint64',
					fieldNumber: 1,
				},
			},
			type: 'object',
		},
		token: {
			fieldNumber: 2,
			properties: {
				balance: {
					dataType: 'uint64',
					fieldNumber: 1,
				},
			},
			type: 'object',
		},
	},
	required: ['address', 'keys', 'sequence', 'token'],
	type: 'object',
};
