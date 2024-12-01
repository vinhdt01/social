import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { UserService } from '@services/ user.service';
import { User } from '@entities/user.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Inject } from '@nestjs/common';
@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UserService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache

  ) {}

  @Query(() => [User], { name: 'users' }) // API: users
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
    
  }
  @Query(() => User, { name: 'user', nullable: true }) 
  async findOne(
    @Args('id', { type: () => Int }) id: number
  ): Promise<User | null> {

     const cacheKey = `user_${id}`;

    try {
      const cachedUser = await this.cacheManager.get<User>(cacheKey);
      if (cachedUser) {
        console.log(`Returning cached user with ID: ${id}`);
        return cachedUser;
      }

      const user = await this.usersService.findOne(id);

      if (user) {
        await this.cacheManager.set(cacheKey, user, 3600); // Cache for 5 minutes
      }

      return user;
    } catch (error) {
      console.error('Error with Redis cache:', error);
      return null;
    }
  }
  
}
