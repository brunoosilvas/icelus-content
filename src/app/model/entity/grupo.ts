
import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity({name: 'grupo'})
export class Grupo {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    nome: string;

    @Column()
    identificador: string;

}
