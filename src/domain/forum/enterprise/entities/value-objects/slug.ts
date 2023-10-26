export class Slug {
  private _value: string

  private constructor(value: string) {
    this._value = value
  }

  get value(): string {
    return this._value
  }

  /**
   * Receives a string and normalize it as a slug.
   *
   * @example
   * "An example title" => "an-example-title"
   *
   * @param text {string}
   * @returns {Slug}
   */
  static createFromText(text: string): Slug {
    const slugText = text
      .normalize('NFKD')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/^[\W-]+/g, '')
      .replace(/_/g, '-')
      .replace(/--/g, '-')
      .replace(/-$/g, '')

    return new Slug(slugText)
  }

  static create(slug: string): Slug {
    return new Slug(slug)
  }
}
