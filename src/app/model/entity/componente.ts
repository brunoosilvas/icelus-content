
import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';
import { ComponenteEstrutura } from '@model/entity/embed/compoente-estrutura';

@Entity({name: 'componente'})
export class Componente {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    tipo: string;

    @Column()
    estrutura: ComponenteEstrutura;
}
