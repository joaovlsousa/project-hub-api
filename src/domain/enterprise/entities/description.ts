import { Content } from '@core/entities/content.ts'

export class Description extends Content {
  constructor(value: string) {
    super(
      value,
      300,
      'The description should contain a maximum of 300 characters'
    )
  }
}
