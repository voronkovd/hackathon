import * as mongoose from 'mongoose';
export enum FileStatus {
  ACTIVE = 'ACTIVE',
  PROCESS = 'PROCESS',
  NONE = 'NONE',
}

const FileSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    hash: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(FileStatus),
      default: FileStatus.NONE,
      required: true,
    },
    meta: {
      type: mongoose.Schema.Types.Array,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
    },
  },
);

FileSchema.index({ name: 'text' }, { name: 'text' });
FileSchema.index({ status: 1, createdAt: 'desc' });

export type File = mongoose.InferSchemaType<typeof FileSchema>;
export const File = mongoose.model('File', FileSchema, 'files');
