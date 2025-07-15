import { User } from 'src/user/entity/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Products {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string; 

    @Column()  
    categoria: string;
 
    @Column('decimal')
    precio: number;
 
    @Column('int')
    stock: number;

    @Column({ type: 'date' })
    date: Date;

    @ManyToOne(() => User, user => user.products, { onDelete: 'CASCADE' })
    user: User;
}
