import { User, UsersProjects } from '@db/entities';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DeleteResult, UpdateResult } from 'typeorm';
import { IdArgs, UserToProjectArgs, UserUpdateArgs } from './dto/args';
import {
  CreateUserInput,
  UserDeleteDTO,
  UserToProjectInput,
} from './dto/inputs';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User, {
    description: 'Register user',
    name: 'register',
  })
  public async registerUser(
    @Args('body') body: CreateUserInput
  ): Promise<User> {
    return await this.usersService.createUser(body);
  }

  @Query(() => [User], {
    description: 'Find All Users',
    name: 'All_Users',
  })
  public async findAllUsers(): Promise<User[]> {
    return await this.usersService.findUsers();
  }

  @Query(() => User, {
    description: 'Find User',
    name: 'One_User',
  })
  public async findUserById(@Args() id: IdArgs): Promise<User> {
    return await this.usersService.findUserById(id);
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
  public async updateUser(
    @Args() body: UserUpdateArgs,
    @Args() id: IdArgs
  ): Promise<UpdateResult | undefined> {
    return await this.usersService.updateUser(body, id);
  }

  @Mutation(() => UserDeleteDTO, {
    description: 'Delete user',
    name: 'Delete_User',
  })
  public async deleteUser(
    @Args() id: IdArgs
  ): Promise<DeleteResult | undefined> {
    return await this.usersService.deleteUser(id);
  }
}