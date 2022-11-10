import { SUBMISSION_STATUS } from '../../services/submission';

export const SubmissionStatusOptions = [
  {
    name: 'Failed',
    value: SUBMISSION_STATUS.Failed,
  },
  {
    name: 'Submitted',
    value: SUBMISSION_STATUS.Submitted,
  },
  {
    name: 'Received',
    value: SUBMISSION_STATUS.Received,
  },
  {
    name: 'Validated',
    value: SUBMISSION_STATUS.Approved,
  },
  {
    name: 'Vaulted',
    value: SUBMISSION_STATUS.Vaulted,
  },
];

export const ADMIN_ROW_SECTION = {
  LOCATION: 'location',
  DETAILS: 'details',
  IMAGE: 'image',
};

export const ACTION_LABEL = {
  START: 'Start',
  VALIDATE: 'Validate',
  VAULT: 'Vault',
  PRINT_LABEL: 'Print Label',
  LINK_IMAGES: 'Link Images',
  ASSIGN_VAULT: 'Assign Vault',
  DONE: 'Done',
  UNDELETE: 'Undelete',
};

export const ITEM_OR_ORDER = {
  ITEM: 'item',
  ORDER: 'order',
};
