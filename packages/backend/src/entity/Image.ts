import { Column } from "typeorm";
import { IsString } from "class-validator";

export class Image {
    
    @IsString()
    @Column()
    basename: string;

    @Column('int', { nullable: true })
    width: number;

    @Column('int', { nullable: true })
    height: number;

    apiLink: string;
}
