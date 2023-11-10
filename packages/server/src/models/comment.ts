import type { ModelAttributes } from 'sequelize'
import { DataType, Model } from 'sequelize-typescript'

export type CommentType = {
  id: string
  id_topic: string
  id_parent: string | null
  id_author: string
  content: string
}

export const commentModel: ModelAttributes<Model, CommentType> = {
  id: {
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  id_topic: {
    type: DataType.STRING,
    allowNull: false,
  },
  id_parent: {
    type: DataType.STRING,
  },
  id_author: {
    type: DataType.STRING,
    allowNull: false,
  },
  content: {
    type: DataType.STRING,
    allowNull: false,
  },
}
