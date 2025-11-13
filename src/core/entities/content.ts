import { BadRequestError } from '../errors/bad-request-error.ts'

export class Content {
  private value: string

  public toString() {
    return this.value
  }

  constructor(value: string, length: number, message?: string) {
    if (value.length > length) {
      throw new BadRequestError(
        message ?? `The value should contain a maximum of ${length} characters.`
      )
    }

    this.value = value
  }
}
