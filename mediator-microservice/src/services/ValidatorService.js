export const validateId = (id, allowedIds) => {
  if (!allowedIds.includes(id)) {
    return false;
  }
  return true;
};
