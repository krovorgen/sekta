import type { ModelAttributes } from 'sequelize'
import { DataType, Model } from 'sequelize-typescript'

export type ThemeType = {
  id: number
  userId: number
  theme: string
}

export const themeModel: ModelAttributes<Model, ThemeType> = {
  id: {
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  },
  theme: {
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'light',
  },
}
