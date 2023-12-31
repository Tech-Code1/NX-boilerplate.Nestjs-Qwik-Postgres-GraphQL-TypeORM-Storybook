import { STATUS_TASK } from '@db/constants';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Project } from '.';
import { BaseEntity } from './base.entity';

// extends Base
@ObjectType()
@Entity({ name: 'task' })
export class Task extends BaseEntity {
  @Field(() => String)
  @Column()
  taskName!: string;

  @Field(() => String)
  @Column()
  taskDescription!: string;

  @Field(() => STATUS_TASK)
  @Column({ type: 'enum', enum: STATUS_TASK })
  status!: STATUS_TASK;

  @Field(() => String)
  @Column()
  responsableName!: string;

  @Field(() => Project)
  @ManyToOne(() => Project, (project) => project.tasks)
  @JoinColumn({
    name: 'project-id',
  })
  project!: Project;
}
