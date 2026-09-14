import { Injectable } from '@nestjs/common';

export class Connection {
  getName(): string | null {
    return null;
  }
}

@Injectable()
export class MysqlConnection extends Connection {
  getName(): string | null {
    return 'Mysql';
  }
}

@Injectable()
export class MongoDBConnection extends Connection {
  getName(): string | null {
    return 'Mongo DB';
  }
}
