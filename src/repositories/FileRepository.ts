import BaseRepository from 'components/BaseRepository';
import { File, FileStatus } from 'entity/File';
import { FindQueryType } from 'types/repositories';

export default class FileRepository extends BaseRepository {
  async findAvailable({ limit = 50, offset = 0 }: FindQueryType): Promise<File[] | []> {
    return this.find({ status: FileStatus.ACTIVE }, { limit, offset });
  }

  async countAvailable(): Promise<number> {
    return this.count({ status: FileStatus.ACTIVE });
  }
}
