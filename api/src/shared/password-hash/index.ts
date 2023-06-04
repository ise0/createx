import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import { ErrorCodes, OperationalError } from '../operational-error';
import { logger } from '../logger';

const scryptPromise = promisify(scrypt);

export async function hash(password: string) {
  try {
    const salt = randomBytes(16).toString('hex');
    const derivedKey = await scryptPromise(password, salt, 64);
    return { data: salt + ':' + (derivedKey as Buffer).toString('hex') };
  } catch (error) {
    logger.error(error);
    return { error: new OperationalError({ code: ErrorCodes.internalError, error: undefined }) };
  }
}

export async function verify(password: string, hash: string) {
  try {
    const [salt, key] = hash.split(':');
    const derivedKey = await scryptPromise(password, salt, 64);
    return { data: (derivedKey as Buffer).toString('hex') === key };
  } catch (error) {
    logger.error(error);
    return { error: new OperationalError({ code: ErrorCodes.internalError, error: undefined }) };
  }
}
