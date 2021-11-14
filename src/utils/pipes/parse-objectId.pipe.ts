import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform {
  transform(value: any) {
    const validObjectId = Types.ObjectId.isValid(value);

    if (!validObjectId) {
      throw new NotFoundException('Invalid ObjectId');
    }

    return Types.ObjectId.createFromHexString(value);
  }
}
