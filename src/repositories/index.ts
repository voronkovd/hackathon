import { File } from 'entity/File';
import FileRepository from './FileRepository';

export type TypeRepositories = { file: FileRepository };

const repositories: TypeRepositories = { file: new FileRepository(File) };

export default repositories;
