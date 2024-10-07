import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { HttpModule } from '@nestjs/axios';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { RedisService } from './util/redis/redis.service';
import { KafkaService } from './util/kafka/kafka.service';
import { GroupController } from './api/group/group.controller';
import { UserController } from './api/user/user.controller';
import { GroupService } from './api/group/group.service';
import { UserService } from './api/user/user.service';
import { SupabaseService } from './util/supabase/supabase.service';
import { DashboardController } from './api/dashboard/dashboard.controller';
import { DashboardService } from './api/dashboard/dashboard.service';
import { SubscribersController } from './api/subscribers/subscribers.controller';
import { SubscribersService } from './api/subscribers/subscribers.service';

@Module({
  imports: [
    HttpModule,
    ElasticsearchModule.register({
      node: 'http://localhost:9200',
      auth: {
        username: 'elastic',
        password: 'password',
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true, // makes the configuration available globally
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../client/dist/client/browser'),
      exclude: ['/api*'],
    }),
  ],
  controllers: [AppController, AuthController, GroupController, UserController, DashboardController, SubscribersController],
  providers: [AppService, AuthService, RedisService, KafkaService, GroupService, UserService, SupabaseService, DashboardService, SubscribersService],
})
export class AppModule {}
