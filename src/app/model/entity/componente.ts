
import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';
import { Estrutura } from '@model/entity/embed/estrutura';

@Entity({name: 'componente'})
export class Componente {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    tipo: string;

    @Column()
    estrutura: Estrutura;
}
