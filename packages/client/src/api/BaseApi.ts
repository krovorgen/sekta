import { apiInstance } from './index'
import { KyInstance } from 'ky/distribution/types/ky'

export abstract class BaseAPI {
  protected http: KyInstance = apiInstance

  public abstract create?(data: unknown): Promise<unknown>

  public abstract read?(identifier?: string | number): Promise<unknown>

  public abstract update?(
    identifier: string | number,
    data: unknown
  ): Promise<unknown>

  public abstract delete?(identifier: string | number): Promise<unknown>
}
