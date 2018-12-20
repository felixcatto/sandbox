import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn,
} from 'typeorm';
import { Article } from './Article';


@Entity()
class Comment {
  @PrimaryGeneratedColumn()
  id = undefined;

  @Column('varchar')
  author = '';

  @Column('text')
  text = '';

  @ManyToOne(() => Article, article => article.comments, { onDelete: 'CASCADE' })
  @JoinColumn()
  article = undefined;
}

export { Comment };
