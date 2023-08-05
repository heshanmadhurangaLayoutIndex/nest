import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CallRecordService } from './call-record.service';
import { CreateCallRecordDto } from './dto/create-call-record.dto';
import { UpdateCallRecordDto } from './dto/update-call-record.dto';

@Controller('call_record')
export class CallRecordController {
  constructor(private readonly callRecordService: CallRecordService) {}

  @Post(':customerID')
  create(
    @Param('customerID') customerID: string,
    @Body() createCallRecordDto: CreateCallRecordDto,
  ) {
    return this.callRecordService.create(customerID, createCallRecordDto);
  }

  @Get()
  findAll() {
    return this.callRecordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.callRecordService.findOne(id);
  }

  @Get('customer/:customerID')
  findByCustomerID(@Param('customerID') customerID: string) {
    return this.callRecordService.findByCustomerID(customerID);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCallRecordDto: UpdateCallRecordDto,
  ) {
    return this.callRecordService.update(id, updateCallRecordDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.callRecordService.remove(+id);
  // }
}
