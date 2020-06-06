import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';
import { Thumbnail } from '@model/entity/embed/thumbnail';

@Entity({name: 'configuracao'})
export class Configuracao {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    thumbnail: Thumbnail;

}
