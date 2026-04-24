import { useState } from "react"

const TURNS = {
  X: "x",
  O: "o"
}

const Square = ({children, is_selected, update_board, index}) => {
  const class_name = `square ${is_selected ? 'is-selected' : ''}`

  const handle_click = () => {
    update_board(index)
  }
  return (
  <div onClick= {handle_click} className={class_name}>
    {children}
  </div>
)}

const winner_combos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function App() {
  const [board, set_board] = useState(Array(9).fill(null))
  // const [board, setBoard] = useState(['x', 'o', 'x', 'x', 'o', 'x', 'x', 'o', 'o'])

  const [turn, set_turn] = useState(TURNS.X)

  // null es que no hay ganador, false es que hay un empate
  const [winner, set_winner] = useState(null)

  const check_winner = (board_to_check) => {
    for (const combo of winner_combos) {
      const [a, b, c] = combo
      if (
        board_to_check [a] && 
        board_to_check[a] === board_to_check[b] && 
        board_to_check[a] === board_to_check[c]
      ) {
        return board_to_check[a]
      }
    }
    
  }

  const update_board = (index) => {
    // si ya tiene algo 
    if (board[index]) return

    // actualizar el tablero
    const new_board = [...board]
    new_board[index] = turn
    set_board(new_board)

    // cambiar de turno
    const new_turn = turn === TURNS.X ? TURNS.O: TURNS.X
    set_turn(new_turn)

    //Revisar si hay un ganador
  }


  return (
    <main className="board">
      <h1>Tres En Raya</h1>
      <section className="game">
        {
          board.map((_, index) => {
            return (
              <Square key={index} index={index} update_board={update_board}>
                {board[index]}
              
              </Square>
            )
          })
        }
      </section>

      <section className="turn">
        <Square is_selected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square is_selected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

    </main>
    
 
  )
}

export default App
