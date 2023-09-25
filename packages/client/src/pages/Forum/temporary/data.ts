export interface ITopic {
  id: number
  date: string
  title: string
  firstMessage?: string | null
  lastMessage?: string | null
  qty?: number | null
  unrd?: number
  remove?: boolean
  edit?: boolean
  comments?: {
    id: number
    author: string
    date: string
    text: string
  }[]
}

const data: ITopic[] = [
  {
    id: 28,
    date: '30.06.2022',
    title: 'Мутная тема',
    firstMessage: 'скинуться по пятихатке, просто так',
    qty: 1,
    unrd: undefined,
    remove: true,
    edit: true,
    comments: [
      {
        id: 1,
        author: 'author',
        date: 'date',
        text: 'text text text text text text text text text text text',
      },
      {
        id: 2,
        author: 'author2',
        date: 'date2',
        text: 'text2 text text text text text text text text text text',
      },
      {
        id: 3,
        author: 'author',
        date: 'date',
        text: 'text text text text text text text text text text text',
      },
    ],
  },
  {
    id: 12,
    date: '30.06.2022',
    title: 'баги',
    firstMessage: 'В этой теме предлагается описывать баги',
    lastMessage: 'Ваше приложение один сплошной баг, бугагашеньки',
    qty: 99,
    unrd: 88,
    edit: true,
    comments: [
      {
        id: 4,
        author: 'author',
        date: 'date',
        text: 'Ваше приложение один сплошной баг, бугагашеньки 1',
      },
      {
        id: 5,
        author: 'author2',
        date: 'date2',
        text: 'Ваше приложение один сплошной баг, бугагашеньки 2',
      },
      {
        id: 6,
        author: 'author',
        date: 'date',
        text: 'Ваше приложение один сплошной баг, бугагашеньки 3',
      },
    ],
  },
  {
    id: 55,
    date: '30.06.2022',
    title: 'Нововведения',
    firstMessage: 'Ввели в действие вот эту вот игру',
    lastMessage: 'Вся ваша радость, благодаря нововведениям',
    qty: 130,
    unrd: 120,
    remove: true,
    comments: [
      {
        id: 1,
        author: 'author 1',
        date: 'date',
        text: 'Вся ваша радость, благодаря нововведениям 1',
      },
      {
        id: 7,
        author: 'author2',
        date: 'date2',
        text: 'Вся ваша радость, благодаря нововведениям 2',
      },
      {
        id: 9,
        author: 'author 1',
        date: 'date',
        text: 'Вся ваша радость, благодаря нововведениям 3',
      },
    ],
  },
]

Array(100)
  .fill('')
  .forEach((_, i) =>
    data.push({
      id: (i + 1) * 100,
      date: '20.10.2021',
      title: `Топик #${i + 1}`,
      qty: 1000000 + (i + 1) * 10000,
    })
  )

export { data }
