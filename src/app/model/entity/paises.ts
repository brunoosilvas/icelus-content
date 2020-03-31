import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity({name: 'paises'})
export default class Paises {

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
