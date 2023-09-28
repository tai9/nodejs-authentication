import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
  })
  username: string;

  @Column({
    type: "varchar",
  })
  password: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  email?: string;
}
