import {Entity, Column, ObjectIdColumn, ObjectID} from 'typeorm';
import { Distritos } from './Distritos';

@Entity({name: 'bairros'})
export class Bairros {
    
    @ObjectIdColumn()
    id: ObjectID;     

    @Column(type => Distritos)
    distritos: Distritos;

    @Column()
    nome: string;

    @Column()
    nomeAbreviado: string;

    @Column()
    usuario: string;

    @Column()
    dataAlteracao: Date;

}