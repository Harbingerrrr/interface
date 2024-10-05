import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { ElasticsearchService } from './util/elasticsearch/elasticsearch.service';
import { RedisService } from './util/redis/redis.service';
import { KafkaService } from './util/kafka/kafka.service';
import { GroupController } from './api/group/group.controller';
import { UserController } from './api/user/user.controller';
import { GroupService } from './api/group/group.service';
import { UserService } from './api/user/user.service';
import { SupabaseService } from './util/supabase/supabase.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes the configuration available globally
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../client/dist/client/browser'),
      exclude: ['/api*'],
    }),
  ],
  controllers: [AppController, AuthController, GroupController, UserController],
  providers: [AppService, AuthService, ElasticsearchService, RedisService, KafkaService, GroupService, UserService, SupabaseService],
})
export class AppModule {}
