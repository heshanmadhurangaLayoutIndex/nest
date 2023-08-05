import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateContactInformationDto } from './dto/create-contact-information.dto';
import { UpdateContactInformationDto } from './dto/update-contact-information.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactInformation } from './entities/contact-information.entity';
import { Repository } from 'typeorm';
import { ResponseData, generateResponse } from 'src/utility/response.utill';

@Injectable()
export class ContactInformationService {
  constructor(
    @InjectRepository(ContactInformation)
    private contactInformationRepository: Repository<ContactInformation>,
  ) {}

  async create(
    createContactInformationDto: CreateContactInformationDto,
  ): Promise<ResponseData<ContactInformation>> {
    try {
      const contactInformation = await this.contactInformationRepository.create(
        {
          ...createContactInformationDto,
        },
      );
      const savedContactInformation =
        await this.contactInformationRepository.save(contactInformation);

      return generateResponse(
        true,
        200,
        'Contact Information created successfully',
        savedContactInformation,
      );
    } catch (error) {
      if (error.code == '23505') {
        throw new BadRequestException(
          'Contact Information already exists with this email',
        );
      }
      throw error;
    }
  }

  async findAll(): Promise<ResponseData<ContactInformation[]>> {
    const contactInformations = await this.contactInformationRepository.find();
    return generateResponse(
      true,
      200,
      'Contact Informations retrieved successfully',
      contactInformations,
    );
  }

  async update(
    id: string,
    updateContactInformationDto: UpdateContactInformationDto,
  ): Promise<ResponseData<ContactInformation | null>> {
    try {
      const contactInformation =
        await this.contactInformationRepository.findOne({ where: { id } });
      if (!contactInformation) {
        throw new BadRequestException('Contact Information not found');
      }
      await this.contactInformationRepository.update(
        id,
        updateContactInformationDto,
      );
      const updatedContactInformation =
        await this.contactInformationRepository.findOne({
          where: { id },
        });
      return generateResponse(
        true,
        200,
        'Contact Information updated successfully',
        updatedContactInformation,
      );
    } catch (error) {
      if (error.code == '23505') {
        throw new BadRequestException(
          'Contact Information already exists with this email',
        );
      }
      throw error;
    }
  }

  async findOne(id: string): Promise<ResponseData<ContactInformation | null>> {
    try {
      const contactInformation =
        await this.contactInformationRepository.findOne({ where: { id } });
      if (!contactInformation) {
        throw new BadRequestException('Contact Information not found');
      }
      return generateResponse(
        true,
        200,
        'Contact Information retrieved successfully',
        contactInformation,
      );
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<ResponseData<ContactInformation>> {
    try {
      const contactInformation =
        await this.contactInformationRepository.findOne({ where: { id } });
      if (!contactInformation) {
        throw new BadRequestException('Contact Information not found');
      }
      await this.contactInformationRepository.delete(id);
      return generateResponse(
        true,
        200,
        'Contact Information deleted successfully',
        contactInformation,
      );
    } catch (error) {
      throw error;
    }
  }
}
