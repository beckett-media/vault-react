/* eslint-disable valid-jsdoc */
import { putInventory } from '../../services/inventory';
import { createVaulting } from '../../services/items';
import { updateSubmission } from '../../services/submission';

export const Action = {
  ASSIGN_VAULT: 'ASSIGN_VAULT',
  LINK_IMAGES: 'LINK_IMAGES',
  VAULT: 'VAULT',
  VALIDATE: 'VALIDATE',
};

/**
 * Process action. This is an unified action handler to
 * extract logic from UI component, and handles all possible actions in a single place.
 * @param {'ASSIGN_VAULT' | 'LINK_IMAGES' | 'VAULT' | 'VALIDATE'} action action type string
 * @param {string} item_id submission or inventory id. if `action` is 'VAULT', then this param will be ignored
 * @param {object} payload submission, inventory or vaulting data
 * @param {Function} setIsLoading loading status callback
 * @param {Function} setError error message callback
 * @return Promise
 */
export const processAction = async (action, item_id, payload, setIsLoading, setError) => {
  const updateLoadingStatus = (status) => {
    if (setIsLoading) {
      setIsLoading(status);
    }
  };

  const updateErrorMessage = (error) => {
    if (setError) {
      setError(error);
    }
  };

  updateLoadingStatus(true);

  if (action === Action.VALIDATE) {
    return updateSubmission(item_id, payload)
      .catch((e) => {
        updateErrorMessage(e.message);
        return e;
      })
      .finally(() => updateLoadingStatus(false));
  }

  if (action === Action.LINK_IMAGES) {
    return updateSubmission(item_id, payload)
      .catch((e) => {
        updateErrorMessage(e.message);
        return e;
      })
      .finally(() => updateLoadingStatus(false));
  }

  if (action === Action.ASSIGN_VAULT) {
    return putInventory(item_id, payload)
      .catch((e) => {
        updateErrorMessage(e.message);
        return e;
      })
      .finally(() => updateLoadingStatus(false));
  }

  if (action === Action.VAULT) {
    return createVaulting(payload)
      .catch((e) => {
        updateErrorMessage(e.message);
        return e;
      })
      .finally(() => updateLoadingStatus(false));
  }

  updateLoadingStatus(false); // revert
  throw new Error(`Incorrect action: ${action}`);
};
