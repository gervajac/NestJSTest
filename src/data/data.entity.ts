import { Entity, Column, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class Data {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    product: string

    @Column()
    brand: string

    @Column()
    price: number

    @Column({nullable: true}) 
    image: string;

    @Column({
        type: "enum",
        enum: ["Blanqueria", "Remeras", "Jeans", "Accesorios"]
    })
    section: string;

    @Column({type: "datetime", default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date


}

const data = new Data()