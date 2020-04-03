
import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity({name: 'grupo'})
export default class Grupo {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    nome: string;

    @Column()
    sigla: string;

    @Column()
    codigoInep: number;

    @Column()
    nacionalidade: string;

}
