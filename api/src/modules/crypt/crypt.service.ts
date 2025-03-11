import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';

@Injectable()
export class CryptService {
  async encrypt(password: string): Promise<string> {
    return await hash(password, 10);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return await compare(password, hash);
  }
}
