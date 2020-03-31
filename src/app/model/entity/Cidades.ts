import { Entity, PrimaryColumn, OneToOne, JoinColumn, Column, ObjectIdColumn, ObjectID } from "typeorm";
import { Estados } from './Estados';

@Entity({name: 'cidades'})
export class Cidades {

    @ObjectIdColumn()
    id: ObjectID; 

    @Column(type => Estados)
    estados: Estados;

    @Column()
    nome: string;

    @Column()
    sigla: string;

    @Column()
    codigoSicon: number;

    @Column()
    codigoIbge: number;

    @Column()
    codigoInep: number;

    @Column()
    usuario: string;

    @Column()
    dataAlteracao: Date;
    
}