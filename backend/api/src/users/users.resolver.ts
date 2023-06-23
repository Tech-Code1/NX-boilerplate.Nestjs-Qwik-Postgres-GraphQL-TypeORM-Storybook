import { User, UsersProjects } from '@db/entities';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IdArgs, UserToProjectArgs } from './dto/args';
import { ValidRolesArgs } from './dto/args/roles.arg';
import { UpdateUserInput, UserToProjectInput } from './dto/inputs';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  /* @Mutation(() => User, {
    description: 'Register user',
    name: 'register',
  })
  public async registerUser(@Args('body') body: AuthInput): Promise<User> {
    return await this.usersService.createUser(body);
  } */

  @Query(() => [User], {
    description: 'Find All Users',
    name: 'All_Users',
  })
  public async findAllUsers(): Promise<User[]> {
    return await this.usersService.findUsers();
  }

  @Query(() => [User], {
    description: 'Find All Args',
    name: 'All_Args',
  })
  public async findAllArgs(
    @Args() validRoles: ValidRolesArgs
  ): Promise<User[]> {
    return await this.usersService.findAllArgs(validRoles.roles);
  }

  @Query(() => User, {
    description: 'Find User with projects',
    name: 'One_User_Projects',
  })
  public async findUserById(@Args() { id }: IdArgs): Promise<User> {
    return await this.usersService.findUserByIdWithProjects(id);
  }

  @Mutation(() => User, {
    description: 'Add user to project',
    name: 'Add_To_Project',
  })
  public async userInProject(
    @Args() body: UserToProjectArgs
  ): Promise<UserToProjectInput & UsersProjects> {
    return await this.usersService.relationToProject(body);
  }

  @Mutation(() => User, {
    description: 'Edit user',
    name: 'Edit_User',
  })
  public async updateUser(@Args('body') body: UpdateUserInput): Promise<User> {
    return await this.usersService.updateUser(body, body.id);
  }

  @Mutation(() => User, {
    description: 'Delete user',
    name: 'Delete_User',
  })
  public async deleteUser(@Args() { id }: IdArgs): Promise<User> {
    return await this.usersService.deleteUser(id);
  }

  @Mutation(() => User, {
    description: 'Block user',
    name: 'Block_User',
  })
  public async blockUser(@Args() { id }: IdArgs): Promise<User> {
    return await this.usersService.blockUser(id);
  }
}
