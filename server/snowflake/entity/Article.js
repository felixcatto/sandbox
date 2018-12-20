import {
  Entity, PrimaryGeneratedColumn, Column, OneToMany,
} from 'typeorm';
import { Comment } from './Comment';


@Entity()
class Article {
  @PrimaryGeneratedColumn()
  id = undefined;

  @Column('varchar')
  title = '';

  @Column('text')
  text = '';

  @OneToMany(() => Comment, comment => comment.article)
  comments = undefined;
}

export { Article };
