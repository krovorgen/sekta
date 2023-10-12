export interface IPlayer {
  id: number
  player: string
  time: number
  place?: number | null
}

const data: IPlayer[] = [
  {
    id: 1,
    player: 'Robb Stark',
    time: 100,
  },
  {
    id: 2,
    player: 'Tony Stark',
    time: 12345678,
  },
  {
    id: 3,
    player: 'Aria Stark',
    time: 10000,
  },
  {
    id: 4,
    player: 'George Stark',
    time: 100000,
  },
  {
    id: 5,
    player: 'Freya Stark',
    time: 1000000,
  },
  {
    id: 6,
    player: 'Jon Snow Stark',
    time: 10000000,
  },
]

export { data }
