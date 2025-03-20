import { Type } from '@nestjs/common';
import { ApiResponseProperty } from '@nestjs/swagger';

export class ApiResponseDto<T> {
  data: T;
}

export function ApiResponse<T>(
  classReference: Type<T>,
  { isArray = false }: { isArray?: boolean } = {},
) {
  abstract class SingleResult {
    @ApiResponseProperty({ type: classReference })
    data!: T;
  }

  Object.defineProperty(SingleResult, 'name', {
    writable: false,
    value: `SingleResult${classReference.name}ResponseDto`,
  });

  abstract class ArrayResult {
    @ApiResponseProperty({ type: [classReference] })
    data!: T[];
  }

  Object.defineProperty(ArrayResult, 'name', {
    writable: false,
    value: `ArrayResult${classReference.name}ResponseDto`,
  });

  return isArray ? ArrayResult : SingleResult;
}
