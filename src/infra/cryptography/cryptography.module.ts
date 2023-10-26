import { Module } from '@nestjs/common'
import { BcryptHasher } from './bcrypt-hasher'
import { JwtEncrypter } from './jwt-encrypter'
import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator'
import { HashComparer } from '@/domain/forum/application/cryptography/hash-comparer'
import { Encrypter } from '@/domain/forum/application/cryptography/encrypter'

@Module({
  providers: [
    { provide: HashGenerator, useClass: BcryptHasher },
    { provide: HashComparer, useClass: BcryptHasher },
    { provide: Encrypter, useClass: JwtEncrypter },
  ],
  exports: [HashGenerator, HashComparer, Encrypter],
})
export class CryptographyModule {}
