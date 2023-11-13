import { Client } from 'pg'
import { SequelizeOptions } from 'sequelize-typescript'
import { Sequelize } from 'sequelize'
import { topicModel } from './src/models/topic'
import { commentModel } from './src/models/comment'
import { themeModel } from './src/models/theme'

const { POSTGRES_PORT } = process.env

const sequelizeOptions: SequelizeOptions = {
  host: 'localhost',
  port: Number(POSTGRES_PORT || 5432),
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  dialect: 'postgres',
}

const sequelize = new Sequelize(sequelizeOptions)

export const Topic = sequelize.define('Topic', topicModel)
export const Comment = sequelize.define('Comment', commentModel)
export const Theme = sequelize.define('Theme', themeModel)

Comment.hasMany(Comment, { foreignKey: 'id_parent' })
Comment.belongsTo(Comment, { foreignKey: 'id_parent', targetKey: 'id' })

export const createClientAndConnect = async (): Promise<Client | null> => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    console.log('  ➜ 🎸 Connected to the database')
  } catch (e) {
    console.error(e)
  }
  return null
}
