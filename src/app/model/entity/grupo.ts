
import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';

import { Componente } from '@model/entity/componente';

@Entity({name: 'grupo'})
export class Grupo {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    nome: string;

    @Column()
    componente: Componente[];

}
