import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

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

export function createConnection(configService: ConfigService): Connection {
  if (configService.get('DATABASE') === 'mysql') {
    return new MysqlConnection();
  } else {
    return new MongoDBConnection();
  }
}
