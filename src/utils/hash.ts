import crypto from 'crypto';

type HashPasswordFn = (password: string) => { salt: string; hash: string };

type VerifyPassword = {
  candidatePassword: string;
  salt: string;
  hash: string;
};

export const hashPassword: HashPasswordFn = (password: string) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');

  return { salt, hash };
};

export const verifyPassword = ({
  candidatePassword,
  salt,
  hash,
}: VerifyPassword) => {
  const candidateHash = crypto
    .pbkdf2Sync(candidatePassword, salt, 1000, 64, 'sha512')
    .toString('hex');

  return candidateHash === hash;
};
