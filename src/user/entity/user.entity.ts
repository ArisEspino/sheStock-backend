import { Products } from "src/products/entity/products_entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

//inicializar el tabla de user. que este se creara en el pg_admin
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Products, products => products.user)
    products: Products[];

}