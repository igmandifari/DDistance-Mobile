export const useValidateRequestAssurance = (payload) => {
  const { ktp, agunan, siup, aggree } = payload;

  if (!ktp || !agunan || !siup || !aggree) {
    return false;
  }
  return true;
};
