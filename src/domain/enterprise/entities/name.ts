import { Content } from '@core/entities/content.ts'

export class Name extends Content {
  constructor(value: string) {
    super(value, 50, 'The name should contain a maximum of 300 characters')
  }
}
