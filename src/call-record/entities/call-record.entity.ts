import { Customer } from 'src/customer/entities/customer.entity';
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('call-record')
export class CallRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  topic: string;

  @Column()
  callType: string;

  @Column()
  problem: string;

  @Column()
  priorityLevel: string;

  @Column()
  callBack: string;

  @Column()
  respond: string;

  @Column()
  requiredAction: string;

  @Column()
  fieldStaffInfo: string;

  @Column()
  actionTaken: string;

  @Column()
  status: string;

  @ManyToOne(() => Customer, (customer) => customer.callRecords)
  customer: Customer;

  constructor() {
    this.id = uuidv4();
  }
}
