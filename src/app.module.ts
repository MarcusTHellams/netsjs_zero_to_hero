import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TasksModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'taskmanagment',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    })],
  controllers: [],
  providers: [],
})
export class AppModule {}
