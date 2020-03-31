import { Entity, PrimaryColumn, Column, JoinColumn, OneToOne, ObjectIdColumn, ObjectID } from 'typeorm';
import { Cidades } from './Cidades';

@Entity({name: 'distritos'})
export class Distritos {

    @ObjectIdColumn()
    id: ObjectID;    

    @Column(type => Cidades)
    cidades: Cidades;

    @Column()
    nome: string;

    @Column()
    codigoInep: number;

    @Column()
    usuario: string;

    @Column()
    dataAlteracao: Date;

}