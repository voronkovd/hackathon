import { File } from 'entity/File';
import BaseService from 'components/BaseService';
import { FindQueryType } from 'types/services';
import repositories, { TypeRepositories } from 'repositories/index';

export default class TagService extends BaseService {
  readonly repositories: TypeRepositories;

  constructor(repo = repositories) {
    super();
    this.repositories = repo;
  }

  getResponseFormat(item: File) {
    return {
      id: item._id,
      name: item.name,
      meta: item.meta,
      hash: item.hash,
    };
  }

  async find({ limit = 50, offset = 0 }: FindQueryType) {
    const [files, count] = await Promise.all([
      this.repositories.file.findAvailable({ limit, offset }),
      this.repositories.file.countAvailable(),
    ]);

    const items = files.map((item: File) => this.getResponseFormat(item));
    return { count, items };
  }

  async findById(id: string) {
    const item = await this.repositories.file.findById(id);
    return item ? this.getResponseFormat(item) : null;
  }
}
