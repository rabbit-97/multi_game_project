import { HANDLER_IDS } from '../constants/handlerId.js';

const handlers = {
  [HANDLER_IDS.INITIAL]: {
    protoType: 'initial.InitialPayload',
  },
};

export const getProtoTypeNameByHandlerId = (handlerId) => {
  if (!handlers[handlerId]) {
    throw new Error(`Handler ID ${handlerId} not found`);
  }
  return handlers[handlerId].protoType;
};
