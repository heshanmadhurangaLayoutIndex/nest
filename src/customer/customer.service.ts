import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { generateResponse } from 'src/utility/response.utill';
import { ResponseData } from 'src/utility/response.utill';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async create(
    createCustomerDto: CreateCustomerDto,
  ): Promise<ResponseData<Customer>> {
    try {
      const customer = await this.customerRepository.create({
        ...createCustomerDto,
      });
      const savedCustomer = await this.customerRepository.save(customer);
      return generateResponse(
        true,
        200,
        'Customer created successfully',
        savedCustomer,
      );
    } catch (error) {
      if (error.code == '23505') {
        throw new BadRequestException('Customer already exists with this NIC');
      }
      throw error;
    }
  }

  async findAll(): Promise<ResponseData<Customer[]>> {
    const customers = await this.customerRepository.find();
    return generateResponse(
      true,
      200,
      'Customers retrieved successfully',
      customers,
    );
  }

  async findOne(id: string): Promise<Customer> {
    try {
      return await this.customerRepository.findOne({ where: { id } });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOneByDetails(
    fullName: string,
    mobileNumber: string,
    nicNumber: string,
  ): Promise<ResponseData<Customer | null>> {
    try {
      console.log(fullName, mobileNumber, nicNumber);
      if (!fullName && !mobileNumber && !nicNumber) {
        throw new BadRequestException('Customer not found');
      }
      const customerDeatils = await this.customerRepository.findOne({
        where: { fullName, mobileNumber, nicNumber },
      });
      if (!customerDeatils) {
        throw new BadRequestException('Customer not found');
      }
      return generateResponse(
        true,
        200,
        'Customer retrieved successfully',
        customerDeatils,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<ResponseData<Customer | null>> {
    try {
      const customer = await this.customerRepository.findOne({ where: { id } });
      if (!customer) {
        throw new BadRequestException('Customer not found');
      }
      await this.customerRepository.update(id, updateCustomerDto);
      const updatedCustomer = await this.customerRepository.findOne({
        where: { id },
      });
      return generateResponse(
        true,
        200,
        'Customer updated successfully',
        updatedCustomer,
      );
    } catch (error) {
      if (error.code == '23505') {
        throw new BadRequestException('Customer already exists with this NIC');
      }
      throw error;
    }
  }

  async remove(id: string): Promise<ResponseData<Customer | null>> {
    try {
      const customer = await this.customerRepository.findOneBy({ id });
      if (!customer) {
        throw new BadRequestException('Customer not found');
      }
      await this.customerRepository.delete(id);
      return generateResponse(
        true,
        200,
        'Customer deleted successfully',
        customer,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
