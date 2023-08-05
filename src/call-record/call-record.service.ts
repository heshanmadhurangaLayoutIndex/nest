import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCallRecordDto } from './dto/create-call-record.dto';
import { UpdateCallRecordDto } from './dto/update-call-record.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CallRecord } from './entities/call-record.entity';
import { Repository } from 'typeorm';
import { CustomerService } from 'src/customer/customer.service';
import { ResponseData, generateResponse } from 'src/utility/response.utill';

@Injectable()
export class CallRecordService {
  constructor(
    @InjectRepository(CallRecord)
    private callRecordRepository: Repository<CallRecord>,
    private customerService: CustomerService,
  ) {}

  async create(
    customerID: string,
    createCallRecordDto: CreateCallRecordDto,
  ): Promise<ResponseData<CallRecord>> {
    try {
      const customer = await this.customerService.findOne(customerID);
      if (!customer) {
        throw new BadRequestException('Customer not found');
      }

      const callRecord = await this.callRecordRepository.create({
        ...createCallRecordDto,
        customer: customer,
      });

      await this.callRecordRepository.save(callRecord);
      return generateResponse(
        true,
        200,
        'CallRecord created successfully',
        callRecord,
      );
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<ResponseData<CallRecord[]>> {
    const callRecords = await this.callRecordRepository.find();
    return generateResponse(
      true,
      200,
      'CallRecords retrieved successfully',
      callRecords,
    );
  }

  async findOne(id: string): Promise<ResponseData<CallRecord | null>> {
    try {
      const callRecord = await this.callRecordRepository.findOne({
        where: { id },
      });
      if (!callRecord) {
        throw new BadRequestException('CallRecord not found');
      }
      return generateResponse(
        true,
        200,
        'CallRecord retrieved successfully',
        callRecord,
      );
    } catch (error) {
      throw error;
    }
  }

  async findByCustomerID(
    customerID: string,
  ): Promise<ResponseData<CallRecord[]>> {
    try {
      const callRecord = await this.callRecordRepository.find({
        where: { customer: { id: customerID } },
      });
      console.log('firstCallRecord', callRecord);
      if (callRecord.length == 0) {
        throw new BadRequestException('Customer not found');
      }
      return generateResponse(
        true,
        200,
        'CallRecords retrieved successfully',
        callRecord,
      );
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: string,
    updateCallRecordDto: UpdateCallRecordDto,
  ): Promise<ResponseData<CallRecord | null>> {
    try {
      const callRecord = await this.callRecordRepository.findOne({
        where: { id },
      });
      if (!callRecord) {
        throw new BadRequestException('CallRecord not found');
      }
      await this.callRecordRepository.update(id, updateCallRecordDto);
      const updatedCallRecord = await this.callRecordRepository.findOne({
        where: { id },
      });
      return generateResponse(
        true,
        200,
        'CallRecord updated successfully',
        updatedCallRecord,
      );
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<CallRecord> {
    try {
      const callRecord = await this.callRecordRepository.findOneBy({ id });
      if (!callRecord) {
        throw new BadRequestException('CallRecord not found');
      }
      await this.callRecordRepository.delete(id);
      return callRecord;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
