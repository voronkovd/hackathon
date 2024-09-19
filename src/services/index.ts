import FileService from 'services/FileService';

export type TypeServices = { file: FileService };

const services: TypeServices = { file: new FileService() };

export default services;
