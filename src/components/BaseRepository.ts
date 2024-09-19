/* eslint-disable @typescript-eslint/no-explicit-any */
import * as mongoose from 'mongoose';
export default class BaseRepository {
  private model: mongoose.Model<any>;

  constructor(model: mongoose.Model<any>) {
    this.model = model;
  }

  async find(filter: mongoose.FilterQuery<any>, options?: mongoose.QueryOptions) {
    return this.model.find(filter, null, options);
  }

  async findById(id: string) {
    return this.model.findOne({ _id: id });
  }

  async count(filter: mongoose.FilterQuery<any>) {
    return this.model.countDocuments(filter);
  }
}
