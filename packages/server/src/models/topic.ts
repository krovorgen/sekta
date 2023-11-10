import type { ModelAttributes } from 'sequelize'
import { DataType, Model } from 'sequelize-typescript'

type TopicType = {
  id: string
  id_author: string
  title: string
  content: string
}

export const topicModel: ModelAttributes<Model, TopicType> = {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  id_author: {
    type: DataType.STRING,
    allowNull: false,
  },
  title: {
    type: DataType.STRING,
    allowNull: false,
  },
  content: {
    type: DataType.STRING,
    allowNull: false,
  },
}
