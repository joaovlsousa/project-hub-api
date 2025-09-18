import { createId as randomCuid } from '@paralleldrive/cuid2'

export class UniqueEntityID {
  private value: string

  toString() {
    return this.value
  }

  toValue() {
    return this.value
  }

  constructor(value?: string) {
    this.value = value ?? randomCuid()
  }

  public equals(id: UniqueEntityID) {
    return id.toValue() === this.value
  }
}
