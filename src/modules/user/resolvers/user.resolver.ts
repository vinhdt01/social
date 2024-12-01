import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { UserService } from '@services/ user.service';
import { User } from '@entities/user.entity';
import { Cache } from 'cache-manager';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UserService) {}

  @Query(() => [User], { name: 'users' }) // API: users
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
    
  }
  @Query(() => User, { name: 'user', nullable: true }) 
  async findOne(
    @Args('id', { type: () => Int }) id: number
  ): Promise<User | null> {
    return this.usersService.findOne(id);
  }
  
}
