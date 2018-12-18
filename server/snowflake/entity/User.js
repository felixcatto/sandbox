import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsEmail, MinLength } from 'class-validator';


@Entity()
class User {
  @PrimaryGeneratedColumn()
  id = undefined;

  @Column('varchar')
  firstName = '';

  @Column('varchar')
  lastName = '';

  @Column({
    type: 'varchar',
    unique: true,
  })
  @IsEmail()
  email = '';

  @Column('varchar')
  @MinLength(1)
  password = '';
}

export { User };
