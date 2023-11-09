import { TopicDTO, CommentDTO } from '../../../api/ForumAPI'

const topics: TopicDTO[] = [
  {
    id: 28,
    created_at: '30.06.2022',
    id_author: 1234567,
    title: 'Мутная тема',
    content: 'скинуться по пятихатке, просто так',
  },
  {
    id: 12,
    created_at: '30.06.2022',
    id_author: 1234567,
    title: 'баги',
    content: 'В этой теме предлагается описывать баги',
  },
  {
    id: 55,
    created_at: '30.06.2022',
    id_author: 1234567,
    title: 'Нововведения',
    content: 'Ввели в действие вот эту вот игру',
  },
]

const comments: CommentDTO[] = [
  {
    id: 1,
    id_topic: 28,
    id_author: 1347843,
    created_at: '30.06.2022',
    content: 'Я согласен - Дмитрий А.',
  },
  {
    id: 2,
    id_topic: 28,
    id_author: 1347155,
    created_at: '30.06.2022',
    content: 'Я против - George Stark',
  },
  {
    id: 3,
    id_topic: 28,
    id_author: 1347385,
    created_at: '30.06.2022',
    content: 'Я тоже согласна - levVPaname',
  },
  {
    id: 4,
    id_topic: 12,
    id_author: 1347119,
    created_at: '30.06.2022',
    content: 'Afsaf Anatolevich',
  },
  {
    id: 5,
    id_topic: 12,
    id_author: 1345888,
    created_at: '30.06.2022',
    content: 'Pasdf Sekta8',
  },
  {
    id: 6,
    id_topic: 12,
    id_author: 1347385,
    created_at: '30.06.2022',
    content: 'Ваше приложение один сплошной баг, бугагашеньки 3. levVPaname',
  },
  {
    id: 7,
    id_topic: 55,
    id_author: 1347843,
    created_at: '30.06.2022',
    content: 'Вся ваша радость, благодаря нововведениям 1. Дмитрий А.',
  },
  {
    id: 8,
    id_topic: 55,
    id_author: 1347119,
    created_at: '30.06.2022',
    content: 'Вся ваша радость, благодаря нововведениям 2. Afsaf Anatolevich',
  },
  {
    id: 9,
    id_topic: 55,
    id_author: 1347155,
    created_at: '30.06.2022',
    content: 'Вся ваша радость, благодаря нововведениям 3. George Stark',
  },
]

export { topics, comments }
