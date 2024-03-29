const SRSAccountSchema = {
    type: 'object',
    required: ['config'],
    properties: {
      config: {
        fieldNumber: 1,
        type: 'object',
        required: ['friends'],
        properties: {
          friends: {
              type: 'array',
              fieldNumber: 1,
              items: {
                  dataType: 'bytes',
              },
          },
          recoveryThreshold: {
              dataType: 'uint32',
              fieldNumber: 2,
          },
          delayPeriod: {
              dataType: 'uint32',
              fieldNumber: 3,
          },
          deposit: {
            dataType: 'uint64',
            fieldNumber: 4,
          }
        },
        default: {
          friends: [],
          recoveryThreshold: 0,
					delayPeriod: 0,
        },
      },
      status: {
        fieldNumber: 2,
        type: 'object',
        properties: {
          rescuer: {
            dataType: 'bytes',
            fieldNumber: 1,
          },
          created: {
            dataType: 'uint32',
            fieldNumber: 2,
          },
          deposit: {
            dataType: 'uint64',
            fieldNumber: 3,
          },
          vouchList: {
            type: 'array',
            fieldNumber: 4,
            items: {
                dataType: 'bytes',
            },
          },
          active: {
            dataType: 'boolean',
            fieldNumber: 5,
          },
        },
      }
    },
  default: {
    config: {
      friends: [],
      recoveryThreshold: 0,
      delayPeriod: 0,
    },
    status: {
      active: false,
      vouchList: [],
      created: 0,
      deposit: BigInt(0),
      rescuer: Buffer.from(''),
    },
  },
};

const createRecoverySchema = {
  $id: 'srs/recovery/create',
  type: 'object',
  required: ['friends', 'recoveryThreshold', 'delayPeriod'],
  properties: {
    friends: {
      type: 'array',
      fieldNumber: 1,
      items: {
        dataType: 'bytes',
      },
    },
    recoveryThreshold: {
      dataType: 'uint32',
      fieldNumber: 2,
    },
    delayPeriod: {
      dataType: 'uint32',
      fieldNumber: 3,
    },
  },
};

const initiateRecoverySchema = {
  $id: 'srs/recovery/initiate',
  type: 'object',
  required: ['lostAccount'],
  properties: {
    lostAccount: {
      dataType: 'bytes',
      fieldNumber: 1,
    },
  },
};

const vouchRecoverySchema = {
  $id: 'srs/recovery/vouch',
  type: 'object',
  required: ['lostAccount', 'rescuer'],
  properties: {
    rescuer: {
      dataType: 'bytes',
      fieldNumber: 1,
    },
    lostAccount: {
      dataType: 'bytes',
      fieldNumber: 2,
    },
  },
};

const claimRecoverySchema = {
  $id: 'srs/recovery/claim',
  type: 'object',
  required: ['lostAccount'],
  properties: {
    lostAccount: {
      dataType: 'bytes',
      fieldNumber: 1,
    },
  },
};

const closeRecoverySchema = {
  $id: 'srs/recovery/close',
  type: 'object',
  required: ['rescuer'],
  properties: {
    rescuer: {
      dataType: 'bytes',
      fieldNumber: 1,
    },
  },
};

const removeRecoverySchema = {
  $id: 'srs/recovery/remove',
  type: 'object',
  required: ['lostAccount'],
  properties: {
    lostAccount: {
      dataType: 'bytes',
      fieldNumber: 1,
    },
  },
};

module.exports = { SRSAccountSchema, createRecoverySchema, initiateRecoverySchema, vouchRecoverySchema, claimRecoverySchema, closeRecoverySchema, removeRecoverySchema };
