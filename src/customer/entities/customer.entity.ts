import { CallRecord } from 'src/call-record/entities/call-record.entity';
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('customer')
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column()
  mobileNumber: string;

  @Column()
  whatsappNumber: string;

  @Column({ unique: true })
  nicNumber: string;

  @Column()
  email: string;

  @Column()
  city: string;

  @Column()
  district: string;

  @Column()
  province: string;

  @OneToMany(() => CallRecord, (callRecord) => callRecord.customer)
  callRecords: CallRecord[];

  constructor() {
    this.id = uuidv4();
  }
}
