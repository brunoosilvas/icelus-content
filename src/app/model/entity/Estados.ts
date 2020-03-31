import { Entity, OneToOne, JoinColumn, Column, ObjectIdColumn, ObjectID } from "typeorm";
import { Paises } from './paises';

@Entity({name: 'estados'})
export class Estados {

    @ObjectIdColumn()
    id: ObjectID;

    @Column(type => Paises)
    paises: Paises;

    @Column()
    nome: string;

    @Column()
    sigla: string;

    @Column()
    codigoInep: number;

}
